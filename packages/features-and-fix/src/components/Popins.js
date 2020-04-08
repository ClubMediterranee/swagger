export default {
  template: `
    <div class="popup-wrapper" @click="$emit('close')">
      <div class="popup-dialog" @click="preventClosing">
        <div class="popup-title">
          {{title}}
        </div>
        <div class="popup-content">
          <slot/>
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
}
