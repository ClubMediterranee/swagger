import { getCurrentAuth } from './get-current-auth'

export function getAccessToken (authSelectors) {
  const auth = getCurrentAuth(authSelectors)

  if (auth) {
    return auth.get('token') && auth.get('token').get('access_token')
  }
}
