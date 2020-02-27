import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import highlight from 'highlight.js/lib/highlight.js'
import saveAs from 'js-file-download'
import 'highlight.js/styles/agate.css'
import { Fade } from '@clubmed/components'
import Button from './button.compoonent'

// separately require languages
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'))
highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
highlight.registerLanguage('html', require('highlight.js/lib/languages/javascript'))

function CopySvg () {
  return <svg
    className="fill-current"
    height="16px"
    version="1.1"
    viewBox="0 0 22 22"
    width="16px"
    xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g id="Core" transform="translate(-86.000000, -127.000000)">
        <g id="content-copy" transform="translate(86.500000, 127.000000)">
          <path
            d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 L2,16 L2,2 L14,2 L14,0 L14,0 Z M17,4 L6,4 C4.9,4 4,4.9 4,6 L4,20 C4,21.1 4.9,22 6,22 L17,22 C18.1,22 19,21.1 19,20 L19,6 C19,4.9 18.1,4 17,4 L17,4 Z M17,20 L6,20 L6,6 L17,6 L17,20 L17,20 Z"
            id="Shape"></path>
        </g>
      </g>
    </g>
  </svg>
}

function FullscreenSvg () {
  return <svg
    className="fill-current"
    height="16px"
    version="1.1"
    viewBox="0 0 32 32"
    width="16px"
    xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_1"></g>
    <g id="fullscreen">
      <g>
        <polygon points="27.414,24.586 22.828,20 20,22.828 24.586,27.414 20,32 32,32 32,20"></polygon>
        <polygon
          points="12,0 0,0 0,12 4.586,7.414 9.129,11.953 11.957,9.125 7.414,4.586"></polygon>
        <polygon
          points="12,22.828 9.172,20 4.586,24.586 0,20 0,32 12,32 7.414,27.414"></polygon>
        <polygon
          points="32,0 20,0 24.586,4.586 20.043,9.125 22.871,11.953 27.414,7.414 32,12"></polygon>
      </g>
    </g>
  </svg>
}

function DownloadSvg () {
  return <svg
    className="fill-current"
    height="16px"
    version="1.1"
    viewBox="0 0 16 16"
    width="16px"
    xmlns="http://www.w3.org/2000/svg">
    <g fillRule="evenodd" id="Icons with numbers" stroke="none" strokeWidth="1">
      <g id="Group" transform="translate(-720.000000, -432.000000)">
        <path
          d="M721,446 L733,446 L733,443 L735,443 L735,446 L735,448 L721,448 Z M721,443 L723,443 L723,446 L721,446 Z M726,433 L730,433 L730,440 L732,440 L728,445 L724,440 L726,440 Z M726,433"
          id="Rectangle 217"/>
      </g>
    </g>
  </svg>
}

function CloseSvg () {
  return <svg
    className="fill-current"
    height="16px"
    version="1.1"
    viewBox="0 0 512 512"
    width="16px"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"></path>
  </svg>
}

export default class HighlightCode extends Component {
  state = {
    fullscreen: false
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    downloadable: PropTypes.bool,
    fileName: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.el = React.createRef()
  }

  componentDidMount () {
    highlight.highlightBlock(this.el.current)
  }

  componentDidUpdate () {
    highlight.highlightBlock(this.el.current)
  }

  downloadText = () => {
    saveAs(this.props.value, this.props.fileName || 'response.txt')
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

  preventYScrollingBeyondElement = (e) => {
    const target = e.target

    let deltaY = e.nativeEvent.deltaY
    let contentHeight = target.scrollHeight
    let visibleHeight = target.offsetHeight
    let scrollTop = target.scrollTop

    const scrollOffset = visibleHeight + scrollTop

    const isElementScrollable = contentHeight > visibleHeight
    const isScrollingPastTop = scrollTop === 0 && deltaY < 0
    const isScrollingPastBottom = scrollOffset >= contentHeight && deltaY > 0

    if (isElementScrollable && (isScrollingPastTop || isScrollingPastBottom)) {
      e.preventDefault()
    }
  }

  render () {
    let { value, className, downloadable } = this.props
    const { fullscreen, copied } = this.state
    className = className || ''

    return (
      <div
        className={fullscreen ? 'fullscreen fixed top-0 bottom-0 left-0 right-0' : 'relative'}
        onWheel={this.preventYScrollingBeyondElement}>
        <div
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
            value.split('\n') > 15
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

        <div>
          <pre
            ref={this.el}
            onWheel={this.preventYScrollingBeyondElement}
            className={className}>
            {value}
          </pre>
        </div>
      </div>
    )
  }
}
