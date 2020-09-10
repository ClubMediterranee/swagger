import { Header, Icon } from '@clubmed/components'
import { ReactComponent as CLUBMED } from '@clubmed/components/src/statics/svg/clubmed.svg'
import PropTypes from 'prop-types'
import React from 'react'

export default function Topbar (props) {
  let { getComponent, specSelectors, getConfigs } = props
  const info = specSelectors.info()
  const Link = getComponent('Link')
  const AuthorizeBtnContainer = getComponent('AuthorizeBtnContainer', true)
  const ServersContainer = getComponent('ServersContainer', true)
  const SchemesContainer = getComponent('SchemesContainer', true)
  const SearchContainer = getComponent('SearchContainer', true)
  const TagsContainer = getComponent('TagsContainer', true)

  const { appName, legacyUrl } = getConfigs()

  const version = info.get('version')
  const servers = specSelectors.servers()
  const schemes = specSelectors.schemes()

  const hasServers = servers && servers.size && servers.size > 1
  const hasSchemes = schemes && schemes.size && schemes.size > 1
  const hasSecurityDefinitions = !!specSelectors.securityDefinitions()

  return (
    <Header>
      <Link className="cursor-pointer flex flex-no-shrink items-center pr-5 text-blue font-happiness">
        <div className="flex items-center py-2">
          <div className="overflow-hidden flex items-center relative" style={{ height: '40px', top: '-2px' }}>
            <Icon svg={CLUBMED} width="7rem"/>
          </div>
          <div className="mx-auto ml-3 font-happiness text-red text-xl">
            {appName}
            {version ? <span className="text-small ml-1 text-black"><small>v{version}</small></span> : null}
          </div>
        </div>
      </Link>
      <div className="flex items-center h-full" style={{ flex: '1 1 auto' }}>
        {hasServers ? (<ServersContainer/>) : null}
        {hasSchemes ? (<SchemesContainer/>) : null}
      </div>
      <div className="flex items-center h-full" style={{ width: '40%' }}>
        {legacyUrl &&
        <a href={'/old'} className={'whitespace-no-wrap pointer hover:text-blue-active h-full flex items-center'}>Legacy
          doc</a>}
        {TagsContainer ? <TagsContainer/> : null}
        {SearchContainer ? <SearchContainer/> : null}
      </div>
      <div className="flex flex-no-shrink relative">
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
