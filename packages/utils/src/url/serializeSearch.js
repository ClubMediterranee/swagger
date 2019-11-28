export const serializeSearch = (searchMap) => {
  return Object.keys(searchMap).map(k => {
    return `${encodeURIComponent(k)}=${encodeURIComponent(searchMap[k])}`
  }).join('&')
}
