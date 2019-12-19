import { OAuth2Override } from './oauth2.override'
import { AuthorizationPopupOverride } from './authorization-popup.override'

export const OAuth2Plugin = () => {
  return {
    wrapComponents: {
      authorizationPopup: AuthorizationPopupOverride,
      oauth2: OAuth2Override
    }
  }
}
