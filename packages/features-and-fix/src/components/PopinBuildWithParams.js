import { jenkinsClient } from '../utils/JenkinsClient'

export default {
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
        <br/>
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
}
