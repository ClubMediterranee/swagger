// @flow
import classnames from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export function useDropdown () {
  const [isActive, setShow] = useState(false)
  const ref = useRef(null)
  const onClickOutside = useCallback((evt) => {
    if (!ref || !isActive) {
      return
    }

    const { current } = ref

    if (!current || !current.contains(evt.target)) {
      setShow(false)
    }
  }, [ref, isActive, setShow])

  useEffect(() => {
    const listener = onClickOutside
    document.addEventListener('click', listener)
    document.addEventListener('focus', listener)

    return () => {
      document.removeEventListener('click', listener)
      document.removeEventListener('focus', listener)
    }
  }, [onClickOutside])

  return {
    ref,
    isActive,
    show () {
      return setShow(true)
    },
    hide () {
      return setShow(false)
    }
  }
}

export type Props = {
  title?: string | Node;
  className?: string;
  isAnimated?: Boolean;
  children: Node;
  minWidth?: string;
  maxHeight?: string;
}

export function Dropdown ({ title: Title, className = '', isAnimated, style, children, minWidth = '140px', maxHeight = '200px' }: Props) {
  const { show, hide, isActive, ref } = useDropdown()
  return <div className={classnames(className, 'relative')} ref={ref} style={style}>
    <button
      aria-expanded={isActive}
      type="button"
      onClick={show}
      className={classnames('reset-button cursor-pointer flex items-center px-4 relative focus:text-blue hover:text-blue navigation-arrow text-blue z-2 px-2', {
        'navigation-arrow-active': isActive
      })}>
      {typeof Title === 'string' ? Title : <Title/>}
    </button>
    {
      isActive
        ? <div
          className={classnames('rounded-small shadow-md absolute bg-white overflow-y-auto p-5 rtl:right-0 mt-px top-full', { fadeIn: isAnimated })}
          style={{ minWidth }}>
          <div className={' overflow-auto'} style={{ maxHeight }}>{
            children({
              hide
            })
          }
          </div>
        </div>
        : null
    }
  </div>
}
