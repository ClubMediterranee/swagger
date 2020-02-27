import React from 'react'

const HighlightComponent = React.lazy(() => import('./highlight-code.component'))

export const HighlightPlugin = () => ({
  components: {
    highlightCode: (props) => {
      return 'pppp'
    }
  }
})
