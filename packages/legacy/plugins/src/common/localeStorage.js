import uniqBy from 'lodash/uniqBy'

const STORE_KEY = 'swaggerUi'

export function getState () {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {}
  } catch (er) {
    return {}
  }
}

export function setState (state) {
  localStorage.setItem(STORE_KEY, JSON.stringify(state))
}

export function getKey (key, defaultValue) {
  const state = getState()
  return state[key] || defaultValue
}

export function setKey (key, value) {
  const state = getState()
  state[key] = value

  setState(state)

  return state
}

export function pushUniqValue (key, value) {
  let items = getKey(key) || []
  items = uniqBy([...items, {
    id: value,
    lastUpdate: new Date()
  }], 'id')

  setKey(key, items)
}

export function setLastUpdate (key, value) {
  let items = getKey(key) || []
  items = items.map((item) => {
    if (item.id === value) {
      item.lastUpdate = new Date()
    }
    return item
  })

  setKey(key, items)
}
