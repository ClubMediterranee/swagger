
export const parseSearch = () => {
  let map = {}
  let search = window.location.search

  if (!search) {
    return {}
  }

  if (search !== '') {
    let params = search.substr(1).split('&')

    for (let i in params) {
      if (!params.hasOwnProperty(i)) {
        continue
      }
      i = params[i].split('=')
      map[decodeURIComponent(i[0])] = (i[1] && decodeURIComponent(i[1])) || ''
    }
  }

  return map
}
