import { wrapHighlightCode } from './wrap-highlight-code.component'

export const HighlightPlugin = () => ({
  wrapComponents: {
    highlightCode: wrapHighlightCode
  }
})
