import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Fade, Spinner } from '@reswagger/components'
import { ReactComponent as CLUBMED } from '@reswagger/components/src/statics/svg/trident1.svg'

const Loader = ({ isActive }) => {
  return <div className="opacity-85 z-10 relative">
    <Fade show={isActive}>
      <div
        className="flex items-center justify-center  p-5 fixed top-0 right-0 left-0 bottom-0 bg-white">
        <Spinner iconSvg={CLUBMED}/>
      </div>
    </Fade>
  </div>
}

function FailStatus ({ getComponent }) {
  const Errors = getComponent('errors', true)

  return <div className="info">
    <div className="loading-container">
      <h4 className="title">Failed to load API definition.</h4>
      <Errors/>
    </div>
  </div>
}

function FailConfig ({ errSelectors }) {
  const lastErr = errSelectors.lastError()
  const lastErrMsg = lastErr ? lastErr.get('message') : ''

  return <div
    className="info"
    style={{ maxWidth: '880px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
    <div className="loading-container">
      <h4 className="title">Failed to load remote configuration.</h4>
      <p>{lastErrMsg}</p>
    </div>
  </div>
}

const BaseLayoutComponent = ({ errSelectors, specSelectors, getComponent }) => {
  const topbarRef = useRef(null)
  const bodyRef = useRef(null)
  const sidebarRef = useRef(null)

  useLayoutEffect(() => {
    if (sidebarRef.current) {
      if (topbarRef.current) {
        sidebarRef.current.style.top = `${topbarRef.current.offsetHeight}px`
      }
      if (bodyRef.current) {
        bodyRef.current.style.marginLeft = `${sidebarRef.current.offsetWidth}px`
      }
    }
  })

  const Topbar = getComponent('Topbar', true)
  const Sidebar = getComponent('Sidebar', true)
  const Container = getComponent('Container')
  const SvgAssets = getComponent('SvgAssets')
  const VersionPragmaFilter = getComponent('VersionPragmaFilter')
  const Models = getComponent('Models', true)
  const Operations = getComponent('operations', true)
  const Errors = getComponent('errors', true)
  const Row = getComponent('Row')
  const Col = getComponent('Col')
  const OnlineValidatorBadge = getComponent('onlineValidatorBadge', true)
  let isSwagger2 = specSelectors.isSwagger2()
  let isOAS3 = specSelectors.isOAS3()

  const isSpecEmpty = !specSelectors.specStr()

  const loadingStatus = specSelectors.loadingStatus()

  let loadingMessage = null

  if (loadingStatus === 'failed') {
    loadingMessage = <FailStatus getComponent={getComponent}/>
  }

  if (loadingStatus === 'failedConfig') {
    loadingMessage = <FailConfig errSelectors={errSelectors}/>
  }

  if (!loadingMessage && isSpecEmpty) {
    loadingMessage = <h4>No API definition provided.</h4>
  }

  if (loadingMessage) {
    return <div className="swagger-ui">
      <div className="loading-container">
        {loadingMessage}
      </div>
    </div>
  }

  return (
    <Container className="swagger-ui font-serif relative">
      {Topbar ? <div ref={topbarRef}><Topbar/></div> : null}
      {Sidebar
        ? <div ref={sidebarRef} className="fixed left-0 bottom-0" style={{ width: '260px' }}>
          <Sidebar/>
        </div>
        : null}

      <div className="relative bg-white" ref={bodyRef}>
        <div className="flex swagger-ui pt-5 contain-layout">
          <SvgAssets/>
          <div className={'w-full'}>
            <VersionPragmaFilter isSwagger2={isSwagger2} isOAS3={isOAS3} alsoShow={<Errors/>}>
              <Errors/>

              <Row>
                <Col mobile={12} desktop={12}>
                  <Operations/>
                </Col>
              </Row>
              <Row>
                <Col mobile={12} desktop={12}>
                  <Models/>
                </Col>
              </Row>
            </VersionPragmaFilter>
          </div>
        </div>
        <Row>
          <Col>
            <OnlineValidatorBadge/>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default function StandaloneLayoutComponent (props) {
  const { specSelectors } = props
  const loadingStatus = specSelectors.loadingStatus()

  return (
    <div>
      {loadingStatus !== 'loading' ? <BaseLayoutComponent {...props} /> : null}
      <Loader isActive={loadingStatus === 'loading'}/>
    </div>
  )
}

StandaloneLayoutComponent.propTypes = {
  errSelectors: PropTypes.object.isRequired,
  errActions: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  specSelectors: PropTypes.object.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
  layoutActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired
}
