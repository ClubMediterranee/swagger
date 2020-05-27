import { getCurrentAuthName } from './get-current-auth-name'

export function getCurrentAuth (authSelectors) {
  const name = getCurrentAuthName(authSelectors)

  if (name) {
    return authSelectors.authorized().get(name)
  }
}
