import { Fade } from '@clubmed/components'
import React, { useCallback, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Button from './button.component'
import { CloseSvg } from './close-svg.component'
import { CopySvg } from './copy-svg.component'
import { DownloadSvg } from './download-svg.component'
import { FullscreenSvg } from './fullscreen-svg.component'

function useCopy () {
  const [copied, setCopy] = useState()
  const timerRef = useRef()

  const copy = useCallback(() => {
    setCopy(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setTimeout(() => {
      timerRef.current = setCopy(false)
    }, 1000)
  }, [timerRef, setCopy])

  return {
    copy,
    copied
  }
}

export default function CodeActions ({ value, downloadable, fullscreen, onClick, onDownload }) {
  const { copied, copy } = useCopy()

  return <div
    className="absolute right-0 top-0 p-2 flex flex-nowrap justify-between text-white z-2">
    <CopyToClipboard text={value} onCopy={copy}>
      <Button>
        <CopySvg/>
        <Fade show={copied}>
          <span className="mx-1">Copied</span>
        </Fade>
      </Button>
    </CopyToClipboard>
    {
      value.split('\n').length > 15
        ? <Button onClick={onClick}>
          {
            fullscreen ? <CloseSvg/> : <FullscreenSvg/>
          }
        </Button>
        : null
    }
    {
      downloadable ? <Button onClick={onDownload}>
        <DownloadSvg/>
      </Button> : null
    }
  </div>
}
