export function getOauthDefaultScopes (scopes) {
  return Object.keys(scopes.toJSON()).filter(o => !['api_admin', 'room_assignments'].includes(o))
}
