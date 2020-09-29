import { Fade } from '@clubmed/components'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Button from './button.component'
import { CloseSvg } from './close-svg.component'
import { CopySvg } from './copy-svg.component'
import { DownloadSvg } from './download-svg.component'
import { FullscreenSvg } from './fullscreen-svg.component'

export function wrapHighlightCode (BaseHighlightCode) {
  return class extends BaseHighlightCode {
    state = {
      fullscreen: false
    }

    whenCopy = () => {
      this.setState({ copied: true })

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.setState({ copied: false })
      }, 1000)
    }

    toggleFullscreen = () => {
      this.setState({
        fullscreen: !this.state.fullscreen
      })
    }

    renderActions () {
      let { value, downloadable } = this.props
      const { fullscreen, copied } = this.state

      return <div
        className="absolute right-0 top-0 p-2 flex flex-nowrap justify-between text-white z-2">
        <CopyToClipboard text={value} onCopy={this.whenCopy}>
          <Button>
            <CopySvg/>
            <Fade show={copied}>
              <span className="mx-1">Copied</span>
            </Fade>
          </Button>
        </CopyToClipboard>
        {
          value.split('\n').length > 15
            ? <Button onClick={this.toggleFullscreen}>
              {
                fullscreen ? <CloseSvg/> : <FullscreenSvg/>
              }
            </Button>
            : null
        }
        {
          downloadable ? <Button onClick={this.downloadText}>
            <DownloadSvg/>
          </Button> : null
        }
      </div>
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
          <div className={'absolute bottom-0 right-0 text-white bg-gray-dark p-1 rounded-small text-sm'}>Payload is too large to be highlighted!</div>
        </div>
      }

      return super.render()
    }

    render () {
      const { fullscreen } = this.state

      return <div
        className={fullscreen ? 'fullscreen fixed top-0 bottom-0 left-0 right-0' : 'relative'}>
        {this.renderActions()}
        {this.renderBlock()}
      </div>
    }
  }
}
