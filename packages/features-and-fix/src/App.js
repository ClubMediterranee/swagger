import { getInnerFeatures } from './utils/getInnerFeatures'
import { createJenkinsClient, getBranch, jenkinsClient } from './utils/JenkinsClient'
import { getFeatures } from './utils/FeaturesClient'

function getLabel (type) {
  return type === 'build' ? 'Build' : 'Clean'
}

export default {
  template: `
    <div>
      <Navbar @openSettings="() => open('settings')"></Navbar>
      <section class="section-api-doc">
        <div id="swagger-ui-container" class="swagger-ui-wrap">
          <div class="container">
            <h2>Deployed branches</h2>
            <Features
              :jobs="jobs"
              :features="features"
              :isAuth="isAuth"
              @build="(feature) => onClickBuild('build', feature)"
              @clean="(feature) => onClickBuild('clean', feature)"/>
            <div style="margin-bottom: 10px;">
              <a v-if="!isAuth" class="cm-button secondary-button" :href="cleanFeaturesUrl" target="blank">Clean
                features</a>
              <button
                v-if="isAuth"
                :disabled="!jobsInfos.build"
                @click="() => open('build-with-params')"
                class="cm-button primary-button">
                Deploy new branch
              </button>
            </div>
          </div>
        </div>
      </section>

      <PopinSettings v-if="isOpen('settings')" @close="close"></PopinSettings>
      <PopinBuildWithParams
        title="Deploy new branch"
        v-if="isOpen('build-with-params') && jobsInfos.build"
        :job="jobsInfos.build"
        @close="close"
        @submit="onSubmitBuildWithParams"></PopinBuildWithParams>
    </div>`,
  data () {
    return {
      popin: false,
      form: {},
      jobs: {},
      jobsInfos: {},
      inProgress: false,
      features: getInnerFeatures(),
      cleanFeaturesUrl: `${window.appConfig.jenkinsUrl}/views/API/job/${window.appConfig.jobs.clean}/build?delay=0sec`,
      isAuth: false
    }
  },
  async mounted () {
    // eslint-disable-next-line no-undef
    console.log('[DEV] start app... version: ', process.env.REACT_APP_VERSION)

    this.$toastr.defaultPosition = 'toast-bottom-right'
    createJenkinsClient()
    this.refresh()
      .then(() => {
        this.isAuth = true
      })
      .catch(() => {
        this.isAuth = false
      })

    setInterval(() => {
      console.log('[DEV] Trigger refresh?', !this.inProgress)
      if (!this.inProgress) {
        this.refresh()
      }
    }, 30000)
  },
  methods: {
    open (type) {
      this.close()
      this.popin = type
    },
    isOpen (type) {
      return this.popin === type
    },
    close () {
      this.popin = false
    },

    refresh () {
      this.getFeatures()
      this.refreshJob('build')
      return this.refreshJob('clean')
    },

    async getJobInfo (type) {
      const job = window.appConfig.jobs[type]
      const jobInfo = await jenkinsClient.getJobInfo(job)

      this.jobsInfos = {
        ...this.jobsInfos,
        [type]: jobInfo
      }

      return jobInfo
    },

    async getBuildInfo (type, buildNumber) {
      const job = window.appConfig.jobs[type]
      const { actions, url, number, result } = await jenkinsClient.getBuildInfo(job, buildNumber)
      const branch = getBranch(actions, this.jobsInfos[type].defaultParameter)

      if (!branch) {
        return false
      }

      return {
        branch,
        buildUrl: url,
        buildNumber: number,
        status: result
      }
    },

    async getFeatures () {
      this.features = (await getFeatures()).map((item) => {
        return {
          ...item,
          branch: item.branch
        }
      })

      console.log('[DEV] Get features', this.features)
      return this.features
    },

    async refreshJob (type) {
      const jobInfo = await this.getJobInfo(type)

      console.log('[DEV] Refresh: has build on-going ?', '\ntype:', type, '\nlast completed:', jobInfo.lastCompletedBuild.number, '\nlast build:', jobInfo.lastBuild.number)
      if (jobInfo.lastCompletedBuild.number === jobInfo.lastBuild.number) {
        return false
      }

      // job is on-going
      try {
        this.inProgress = 'on-going'
        this.setJob(type, await this.getBuildInfo(type, jobInfo.lastBuild.number))
        await this.updateProgression(type, jobInfo)
      } catch (er) {
        this.inProgress = false
      }
    },

    async onSubmitBuildWithParams (jobInfo, parameters) {
      const branch = parameters[jobInfo.defaultParameter]

      if (!this.features.find(item => item.branch === branch)) {
        this.features.unshift({
          label: branch,
          url: null,
          date: new Date().toISOString(),
          creation: true
        })
      }

      return this.createBuild('build', jobInfo, parameters)
    },

    async onClickBuild (type, feature) {
      const jobInfo = this.jobsInfos[type]

      return this.createBuild(type, jobInfo, {
        [jobInfo.defaultParameter]: feature.label
      })
    },

    async createBuild (type, jobInfo, parameters) {
      const branch = parameters[jobInfo.defaultParameter]
      try {
        this.inProgress = 'started'

        this.setJob(type, {
          branch,
          buildNumber: null,
          buildUrl: null
        })
        // refresh jobInfo
        jobInfo = await this.getJobInfo(type)

        // run build with params
        await jenkinsClient.buildWithParams(jobInfo.name, parameters)

        this.$toastr.s(`${getLabel(type)} started for ${branch}`)
        await this.updateProgression(type, jobInfo)
      } catch (er) {
        console.error('BUILD JS ERROR', er)
        this.inProgress = false
        this.$toastr.e(`${getLabel(type)} failed for ${branch}`)
      }
    },
    async interceptBuild (type, jobInfo) {
      const current = await this.getJobInfo(type)

      if (jobInfo.lastBuild.number < current.lastBuild.number) {
        const build = await this.getBuildInfo(type, current.lastBuild.number)

        this.setJob(type, build)

        this.inProgress = 'on-going'
      }
    },

    async isBuildFinish (type) {
      const { buildNumber, branch } = this.jobs[type]
      const build = await this.getBuildInfo(type, buildNumber)

      if (['SUCCESS', 'UNSTABLE', 'ERROR', 'ERRORED'].includes(build.status)) {
        this.inProgress = false
        await this.getFeatures(true)

        // force refresh for date
        this.features = this.features.map((feature) => {
          if (feature.branch === branch) {
            feature.date = new Date().toISOString()
          }
          return { ...feature }
        })

        const label = getLabel(type)
        this.$toastr.s(`${label} ${build.status} for ${branch}`)
        this.setJob(type, null)

        return build
      }
      return false
    },

    async updateProgression (type, jobInfo) {
      return new Promise((resolve, reject) => {
        const run = () =>
          setTimeout(async () => {
            try {
              // intercept JOB
              if (this.inProgress === 'started') {
                this.interceptBuild(type, jobInfo)
                return run()
              }

              if (this.inProgress === 'on-going' && this.jobs[type]) {
                const build = await this.isBuildFinish(type)

                if (build) {
                  return resolve(build)
                }

                return run()
              }
            } catch (er) {
              reject(er)
            }
          }, this.inProgress === 'started' ? 1000 : 3000)

        run()
      })
    },

    async setJob (type, job) {
      this.jobs = {
        ...this.jobs,
        [type]: await job
      }
    }
  }
}
