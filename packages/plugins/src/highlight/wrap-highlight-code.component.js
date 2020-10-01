import React, { Suspense } from 'react'

const CodeActionsComponent = React.lazy(() => import(/* webpackChunkName: "code-actions" */'./code-actions.component'))

export function wrapHighlightCode (BaseHighlightCode) {
  return class extends BaseHighlightCode {
    state = {
      fullscreen: false
    }

    toggleFullscreen = () => {
      this.setState({
        fullscreen: !this.state.fullscreen
      })
    }

    renderBlock () {
      const { className = '', value } = this.props
      const sizeOf = JSON.stringify(value).length

      if (sizeOf > 10000) {
        return <div className={'highlight-code relative'}>
          <pre
            className={`${className} microlight`}>
            <code>{value}</code>
          </pre>
          <div className={'absolute bottom-0 right-0 text-white bg-gray-dark p-1 rounded-small text-sm'}>Payload is too
            large to be highlighted!
          </div>
        </div>
      }

      return super.render()
    }

    render () {
      const { fullscreen } = this.state
      const { value, downloadable } = this.props

      const fallback = <div
        className="absolute right-0 top-0 p-2 flex flex-nowrap justify-between text-white z-2">Loading...</div>

      return <div
        className={fullscreen ? 'fullscreen fixed top-0 bottom-0 left-0 right-0' : 'relative'}>
        <Suspense fallback={fallback}>
          <CodeActionsComponent
            value={value}
            downloadable={downloadable}
            fullscreen={fullscreen}
            onDownload={this.downloadText}
            onClick={this.toggleFullscreen}/>
        </Suspense>

        {this.renderBlock()}
      </div>
    }
  }
}
