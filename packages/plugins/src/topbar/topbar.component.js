import React from 'react'
import PropTypes from 'prop-types'
import { Header, Icon, Switch } from '@reswagger/components'
import { ReactComponent as CLUBMED } from '@reswagger/components/src/statics/svg/clubmed.svg'

// import "./topbar.less"
// import Logo from './logo_small.svg'

export default function Topbar (props) {
  let { getComponent, specSelectors, getConfigs } = props
  const info = specSelectors.info()
  const Link = getComponent('Link')
  const AuthorizeBtnContainer = getComponent('AuthorizeBtnContainer', true)
  const ServersContainer = getComponent('ServersContainer', true)
  const SchemesContainer = getComponent('SchemesContainer', true)
  const SearchContainer = getComponent('SearchContainer', true)
  const { appName } = getConfigs()

  const version = info.get('version')
  const servers = specSelectors.servers()
  const schemes = specSelectors.schemes()

  const hasServers = servers && servers.size && servers.size > 1
  const hasSchemes = schemes && schemes.size && schemes.size > 1
  const hasSecurityDefinitions = !!specSelectors.securityDefinitions()

  return (
    <Header>
      <Link className="cursor-pointer flex flex-no-shrink items-center px-5 text-blue font-happiness">
        <div className="flex items-center">
          <div className="overflow-hidden flex items-center relative" style={{ height: '40px', top: '-2px' }}>
            <Icon svg={CLUBMED} width="7rem"/>
          </div>
          <div className="mx-auto ml-3 font-happiness text-red text-xl">
            {appName}
            {version ? <span className="text-small ml-1 text-black"><small>v{version}</small></span> : null}
          </div>
        </div>
      </Link>
      <div
        className="flex items-stretch"
        style={{ flex: '1 1 auto' }}>

        {hasServers ? (<ServersContainer/>) : null}
        {hasSchemes ? (<SchemesContainer/>) : null}

      </div>
      <div className="flex flex-no-shrink relative">
        <Switch isSwitch />
        {SearchContainer ? <SearchContainer/> : null}
        {hasSecurityDefinitions ? <AuthorizeBtnContainer/> : null}
      </div>
    </Header>
  )
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired
}
