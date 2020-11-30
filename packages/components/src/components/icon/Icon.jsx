// @flow
/* eslint-env browser */
import React, { Component } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

const req = require.context('../../statics/svg', true, /.svg$/)

export const ICONS = {}
req.keys()
  .forEach(filename => {
    const key = filename.replace('.svg', '').replace('./', '').toUpperCase()
    ICONS[key] = req(filename).ReactComponent
  }, {})

export type IconProps = {
  alt?: string,
  className?: string,
  color?: '' | 'inherit' | Colors,
  hasRtl?: boolean,
  isNotMonoChrome?: boolean,
  isNotSquare?: boolean,
  svg?: Component,
  name?: string,
  rotation?: number,
  width?: string,
};

type State = {
  isAppMounted: boolean,
  isErrored: boolean,
  ratio: number,
};

const getTransform = ({ hasRtl, rotation }: IconProps, { isAppMounted }: State): string => {
  const rotate = rotation ? `rotate(${rotation}deg)` : ''
  const rtl =
    hasRtl && isAppMounted && document.body && document.body.dir === 'rtl' ? 'scaleX(-1)' : ''

  return [rotate, rtl].join(' ').trim()
}

export class Icon extends Component<IconProps, State> {
  static defaultProps = {
    alt: '',
    color: 'inherit',
    hasRtl: false,
    isNotMonoChrome: false,
    isNotSquare: false,
    name: '',
    rotation: 0,
    width: '1rem'
  }

  constructor (props: IconProps) {
    super(props)

    this.state = {
      isAppMounted: false,
      isErrored: false,
      ratio: 100
    }

    this.nodeRef = React.createRef()
  }

  componentDidMount () {
    this.setDimensions()

    this.setState({ isAppMounted: true })
  }

  componentDidUpdate () {
    this.setDimensions()
  }

  setDimensions = () => {
    if (!this.nodeRef.current) {
      return
    }
    const svg = this.nodeRef.current.querySelector('svg')
    const { isNotSquare } = this.props

    if (!svg) {
      return
    }

    if (isNotSquare) {
      const ratio =
        (get(svg, 'viewBox.baseVal.height', 0) / get(svg, 'viewBox.baseVal.width', 1)) * 100

      this.setState(prevState => {
        if (prevState.ratio !== ratio) {
          return { ratio }
        }
      })
    }
  }

  componentWillUnmount () {
    delete this.svgRef
  }

  render () {
    const {
      alt,
      className,
      color = 'inherit',
      isNotMonoChrome,
      isNotSquare,
      svg: Renderer,
      width,
      svgProps,
      ...props
    } = this.props

    if (!Renderer) {
      return null
    }

    const style = {
      width,
      height: isNotSquare ? 'auto' : width,
      transform: getTransform(this.props, this.state),
      transition: 'all ease-out 0.25s'
    }
    const placeholderStyle = { paddingBottom: `${this.state.ratio}%` }
    const classNames = classnames(
      className,
      'inline-block overflow-hidden relative',
      { [`text-${color}`]: color },
      { 'icon-monochrome': !isNotMonoChrome }
    )

    return (
      <span className={classNames} style={style} title={alt} ref={this.nodeRef} {...props}>
        <span className="relative w-full block" style={placeholderStyle}>
          <Renderer className="absolute h-full top-0 left-0 right-0 bottom-0 w-full" {...svgProps}/>
        </span>
      </span>
    )
  }
}
