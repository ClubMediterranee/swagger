import PropTypes from 'prop-types'
import React from 'react'
import { AuthorizeSvg } from './authorize-icon.component'
import { logoutFromOIDC } from './utils/logout-from-oidc'

export default class AuthorizeBtn extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isAuthorized: PropTypes.bool,
    showPopup: PropTypes.bool,
    getComponent: PropTypes.func.isRequired
  }

  logout = () => {
    let { authActions, authSelectors } = this.props

    let auths = authSelectors.authorized().map((definition, key) => {
      logoutFromOIDC(authSelectors.authorized().get(key))
      return key
    }).toArray()

    authActions.logout(auths)
  }

  render () {
    let { isAuthorized, showPopup, onClick, getComponent, className = '' } = this.props

    // must be moved out of button component
    const AuthorizationPopup = getComponent('authorizationPopup', true)

    return (
      <div className={`auth-wrapper ml-2 ${className}`}>
        <button className={isAuthorized ? 'btn authorize locked' : 'btn authorize unlocked'} onClick={onClick}>
          <AuthorizeSvg isAuthorized={isAuthorized}/>
        </button>
        {isAuthorized
          ? <button className={'btn'} onClick={this.logout}>
            Logout
          </button> : null
        }
        {showPopup && <AuthorizationPopup/>}
      </div>
    )
  }
}
