export default {
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
                <span v-show="getBuildUrl(feature)">(<a :href="getBuildUrl(feature)"
                                                        target="_blank">#{{getBuildNumber(feature)}}</a>)</span>
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
}
