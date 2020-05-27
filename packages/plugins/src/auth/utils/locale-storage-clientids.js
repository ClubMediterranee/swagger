import uniqBy from 'lodash/uniqBy'

const STORE_KEY = 'clientIds'

export function getClientIds (state) {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY))
  } catch (er) {
    return {}
  }
}

export function setClientIds (state) {
  localStorage.setItem(STORE_KEY, JSON.stringify(state))
}

export function getClientId (appName) {
  const clients = getClientIds() || {}
  return clients[appName] || []
}

export function pushClientId (appName, clientId) {
  const clients = getClientIds() || {}
  clients[appName] = uniqBy([...getClientId(appName), {
    id: clientId,
    lastUpdate: new Date()
  }], 'id')

  setClientIds(clients)
}
