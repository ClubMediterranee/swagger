// eslint-disable

(({ Vue, moment, fetch, localStorage, console, JenkinsClient, axios, appConfig, VueToastr }) => {
  let jenkinsClient

  function getInnerFeatures (elem = document) {
    return JSON.parse(document.querySelector('#features-data').textContent)
  }

  function setSettings ({ login, password, api_key }) {
    localStorage.setItem('settings', JSON.stringify({ login, password: window.btoa(password), api_key }))
  }

  function getSettings () {
    try {
      const settings = JSON.parse(localStorage.getItem('settings')) || {}
      return {
        ...settings,
        password: window.atob(settings.password)
      }
    } catch (er) {
      return {
        api_key: '',
        login: '',
        password: ''
      }
    }
  }

  async function fetchFeatures () {
    const response = await fetch(window.location)
    const result = await response.text()

    const fragment = document.createDocumentFragment()
    const div = document.createElement('div')
    div.innerHTML = result.split('<body class="swagger-section">')[1].split('</body>')[0]

    fragment.appendChild(div)

    return getInnerFeatures(fragment)
  }

  async function getFeatures () {
    const [features, stagingVersion] = await Promise.all([
      fetchFeatures(),
      getStagingVersion()
    ])

    const promises = features.map(async ({ url, ...props }) => {
      try {
        const version = await getVersion(url.replace('/doc', ''))
        return {
          ...props,
          url,
          version,
          outdated: isOutdated(stagingVersion, version)
        }
      } catch (er) {
        return undefined
      }
    })

    return (await Promise.all(promises))
      .filter(Boolean)
      .sort((f1, f2) => {
        if (f1.outdated) {
          return 1
        }
        return -1
      })
  }

  function createJenkinsClient () {
    const settings = getSettings()
    jenkinsClient = new JenkinsClient({
      id: settings.login,
      token: settings.password,
      path: appConfig.jenkinsUrl
    })
  }

  async function getVersion (url) {
    const { api_key } = getSettings()
    const { data } = await axios.get(`${url}/v0/version?api_key=${api_key}`)

    return data['@clubmed/digital-api']
  }

  async function getStagingVersion () {
    return getVersion(appConfig.stagingUrl)
  }

  function isOutdated (base, version) {
    const [major1, minor1, patch1] = base.split('-')[0].split('.')
    const [major2, minor2, patch2] = version.split('-')[0].split('.')

    if (+major1 > +major2) {
      return true
    }
    if (+minor1 > +minor2) {
      return true
    }
    return +patch1 > +patch2
  }

  function getBranch (actions, tag) {
    let branch

    actions
      .filter((item) => item.parameters)
      .find((item) => {
        const actionBranch = item.parameters.find(item => item.name === tag)

        if (actionBranch) {
          branch = actionBranch.value
          return true
        }

        return false
      })

    return branch
  }

  Vue.use(VueToastr)

  Vue.component('Popin', {
    template: `
    <div class="popup-wrapper" @click="$emit('close')">
       <div class="popup-dialog" @click="preventClosing">
         <div class="popup-title">
            {{title}}
         </div>
         <div class="popup-content">
           <slot />
         </div>
       </div>
    </div>     
    `,
    props: {
      title: {
        type: String,
        required: true
      }
    },
    methods: {
      preventClosing (e) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
  })

  Vue.component('PopinSettings', {
    template: `
      <Popin title="Settings" @close="$emit('close')">
        <p>
          Configure access to get data from Jenkins and API. Data are storing in local browser and are only used to run action on Jenkins.
        </p>
      
        <form id="form_authorization" @submit="saveForm">
          <div class="form-group">
            <label for="api_key">Api Key</label>
            <input type="text" class="form-control" id="api_key" v-model="form.api_key" placeholder="Enter api_key" required="">
          </div>
          
          <div class="form-group">
            <label for="login">Login</label>
            <input type="text" class="form-control" id="login" v-model="form.login" placeholder="Enter your CM login" required="">
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Enter your CM password" required="">
          </div>
          
          <br />
          <div>
            <button type="submit" @click="saveForm" class="cm-button primary-button --small">Save settings</button>
            <button type="reset" class="cm-button secondary-button --small">Clear</button>
          </div>
         </form> 
      </Popin>
    `,
    data () {
      return {
        form: getSettings()
      }
    },
    methods: {
      saveForm () {
        if (this.form.api_key && this.form.login && this.form.password) {
          setSettings(this.form)
          this.$emit('close')
        }
      }
    }
  })

  Vue.component('PopinBuildWithParams', {
    template: `
      <Popin :title="title" @close="$emit('close')">
        <form>
          <p>
             Fill parameters to run <strong>{{job.name}}</strong> job:
          </p>
          <div class="form-group" v-for="parameter of job.parameters">
            <label :for="parameter.name">{{parameter.name}}</label>
            <select class="form-control" :id="parameter.name" v-model="form[parameter.name]">
              <option v-for="choice of parameter.choices" :value="choice.value">
                {{ choice.label }}
              </option>
            </select>
          </div>
          <br />
          <div>
            <button type="submit" @click="submit" class="cm-button primary-button --small">Build</button>
          </div>
        </form>
      </Popin>
    `,
    props: {
      title: {
        type: String,
        required: true
      },
      job: {
        type: Object,
        required: true
      }
    },
    data () {
      const form = this.job.parameters.reduce((form, item) => {
        return {
          ...form,
          [item.name]: item.choices[0] && item.choices[0].value
        }
      }, {})

      return {
        form
      }
    },
    methods: {
      async submit () {
        await jenkinsClient.buildWithParams(this.job.name, this.form)

        this.$emit('close')
        this.$emit('submit', { ...this.job }, { ...this.form })
      }
    }
  })

  Vue.component('Navbar', {
    template: `
    <nav class="navbar navbar-fixed-top">
      <div class="navbar__container container">
          <a class="navbar__logo" href="#">
              <i class="Icon Icon--clubmed"></i>
              <span>API Features and fix validation</span>
          </a>
          <div class="navbar__center">
  
          </div>
  
          <div class="navbar__right">
            <div>
              <div class="button-rounded" @click="() => $emit('openSettings')">
                <svg 
                  height="18px" 
                  width="18px"
                  version="1.1" 
                  viewBox="0 0 512 512" 
                  xml:space="preserve" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"/>
                </svg>
              </div>
            </div>    
          </div>
      </div>
    </nav>
  `
  })

  Vue.component('RollingDate', {
    template: '<span>created {{ label }}</span>',
    props: {
      date: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        label: moment(this.date).fromNow()
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        this.label = moment(this.date).fromNow()
      }, 60000)
    },
    destroy () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  })

  Vue.component('Features', {
    props: {
      features: {
        type: Array,
        required: true
      },
      isAuth: {
        type: Boolean,
        default: false
      },
      jobs: {
        type: Object,
        default: () => ({})
      }
    },
    template: `
      <ul class="features">
        <li v-for="feature in features" 
          :key="feature.label" 
          :class="{'--outdated': feature.outdated, '--in-progress': inProgress(feature), '--clean': getCleanInfo(feature), '--creation': feature.creation}">
          <a :href="feature.url" target=blank :title="'ver. ' + feature.version">
            <span class="feature__name">{{feature.label}}</span>
            <span class="feature__url" v-show="feature.url">{{feature.url}}</span>
            <div class="feature__date">
              <span v-show="inProgress(feature)">
                {{getCleanInfo(feature) ? 'Clean' : 'Build'}} in progress 
                <span v-show="getBuildUrl(feature)">(<a :href="getBuildUrl(feature)" target="_blank">#{{getBuildNumber(feature)}}</a>)</span>
              </span>
              <span v-show="!inProgress(feature)">
                <RollingDate :date="feature.date"></RollingDate>
                <span class="feature__label-outdated" v-show="feature.outdated">outdated</span>
              </span>
            </div>
          </a>
          <div v-if="isAuth && !inProgress(feature)">
            <div v-if="!buildInfo" class="cm-button primary-button --small" @click="$emit('build', feature)">
               Rebuild
            </div>
            
            <div v-if="!cleanInfo" class="cm-button secondary-button --small" @click="$emit('clean', feature)">
               Clean
            </div>
          </div>
        </li>
      </ul>`,
    computed: {
      cleanInfo () {
        return this.jobs.clean
      },
      buildInfo () {
        return this.jobs.build
      }
    },
    methods: {
      inProgress (feature) {
        return this.getBuildInfo(feature) || this.getCleanInfo(feature)
      },
      getBuildUrl (feature) {
        const info = this.getBuildInfo(feature) || this.getCleanInfo(feature) || {}

        return info.buildUrl || ''
      },
      getBuildNumber (feature) {
        const info = this.getBuildInfo(feature) || this.getCleanInfo(feature) || {}

        return info.buildNumber || ''
      },
      getBuildInfo (feature) {
        if (this.buildInfo && this.buildInfo.branch === feature.label) {
          return this.buildInfo
        }

        return false
      },
      getCleanInfo (feature) {
        if (this.cleanInfo && this.cleanInfo.branch === feature.label) {
          return this.cleanInfo
        }

        return false
      }
    }
  })

  function getLabel (type) {
    return type === 'build' ? 'Build' : 'Clean'
  }

  new window.Vue({
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
            <div>
              <a v-if="!isAuth" class="cm-button secondary-button" :href="cleanFeaturesUrl" target="blank">Clean features</a>
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
        cleanFeaturesUrl: `${appConfig.jenkinsUrl}/views/API/job/${appConfig.jobs.clean}/build?delay=0sec`,
        isAuth: false
      }
    },
    async mounted () {
      this.$toastr.defaultPosition = 'toast-bottom-right'
      createJenkinsClient()

      try {
        await this.refresh()
        this.isAuth = true
      } catch (er) {
        this.isAuth = false
        this.$toastr.w('Authentication failed')
      }

      setInterval(() => {
        if (!this.inProgress) {
          console.log('[DEV] Fetch')
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
        const job = appConfig.jobs[type]
        const jobInfo = await jenkinsClient.getJobInfo(job)

        this.jobsInfos = {
          ...this.jobsInfos,
          [type]: jobInfo
        }

        return jobInfo
      },

      async getBuildInfo (type, buildNumber) {
        const job = appConfig.jobs[type]
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
          await this.getFeatures()

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
  }).$mount('#app')
})(window)
