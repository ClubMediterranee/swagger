import { getSettings, setSettings } from '../utils/settings'

export default {
  template: `
    <Popin title="Settings" @close="$emit('close')">
      <p>
        Configure access to get data from Jenkins and API. Data are storing in local browser and are only used to run
        action on Jenkins.
      </p>

      <form id="form_authorization" @submit="saveForm">
        <div class="form-group">
          <label for="api_key">Api Key</label>
          <input type="text" class="form-control" id="api_key" v-model="form.api_key" placeholder="Enter api_key"
                 required="">
        </div>

        <div class="form-group">
          <label for="login">Login</label>
          <input type="text" class="form-control" id="login" v-model="form.login" placeholder="Enter your CM login"
                 required="">
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="form.password"
                 placeholder="Enter your CM password" required="">
        </div>

        <br/>
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
}
