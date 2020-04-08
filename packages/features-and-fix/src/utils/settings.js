export function setSettings ({ login, password, api_key }) {
  window.localStorage.setItem('settings', JSON.stringify({ login, password: window.btoa(password), api_key }))
}

export function getSettings () {
  try {
    const settings = JSON.parse(window.localStorage.getItem('settings')) || {}
    return {
      ...settings,
      password: window.atob(settings.password)
    }
  } catch (er) {
    return {
      api_key: '',
      login: '',
      password: ''
    }
  }
}
