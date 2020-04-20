import React, { Suspense } from 'react'

const HighlightComponent = React.lazy(() => import(/* webpackChunkName: "highlight" */'./highlight-code.component'))

export const HighlightPlugin = () => ({
  components: {
    highlightCode: (props) => {
      return <Suspense fallback={<div></div>}>
        <HighlightComponent {...props}/>
      </Suspense>
    }
  }
})
