export function getCurrentAuthName (authSelectors) {
  if (authSelectors.authorized().size) {
    return Object.keys(authSelectors.authorized().toJSON())[0]
  }
}
