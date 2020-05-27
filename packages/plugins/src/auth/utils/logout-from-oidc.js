export function logoutFromOIDC (auth) {
  if (auth && auth.get('schema').get('authorizationUrl')) {
    window.location.href = auth.get('schema').get('authorizationUrl').replace('/authorize', '/signout')
  }
}
