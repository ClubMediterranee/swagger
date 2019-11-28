export function getOAuthTitle (name) {
  if (name.indexOf('Bearer_') > -1) {
    return name.split(' (')[1].replace(')', '')
  }
  return name
}
