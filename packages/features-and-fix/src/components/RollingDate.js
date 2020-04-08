import moment from 'moment'

export default {
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
}
