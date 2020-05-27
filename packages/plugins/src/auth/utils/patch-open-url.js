window.$open = window.open

window.open = function open (url) {
  if (url.indexOf('clubmed.com')) {
    url = url.replace('response_type=token', 'response_type=id_token token') + '&nonce=foo'
  }

  return window.$open(url)
}
