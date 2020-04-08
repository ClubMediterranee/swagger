import axios from 'axios'
import { getSettings } from './settings'
import { getInnerFeatures } from './getInnerFeatures'

function isOutdated (base, version) {
  const [major1, minor1, patch1] = base.split('-')[0].split('.')
  const [major2, minor2, patch2] = version.split('-')[0].split('.')

  if (+major1 > +major2) {
    return true
  }
  if (+minor1 > +minor2) {
    return true
  }
  return +patch1 > +patch2
}

export async function getVersion (url) {
  const { api_key } = getSettings()
  const { data } = await axios.get(`${url}/v0/version?api_key=${api_key}`)

  return data['@clubmed/digital-api']
}

export async function getStagingVersion () {
  return getVersion(window.appConfig.stagingUrl)
}

export async function fetchFeatures () {
  const { data } = await axios(window.location + '?timestamp=' + Date.now())

  const fragment = document.createDocumentFragment()
  const div = document.createElement('div')
  div.innerHTML = data.split('<body class="swagger-section">')[1].split('</body>')[0]

  fragment.appendChild(div)

  return getInnerFeatures(fragment)
}

export async function getFeatures () {
  const [features, stagingVersion] = await Promise.all([
    fetchFeatures(),
    getStagingVersion()
  ])

  const promises = features.map(async ({ url, ...props }) => {
    try {
      const version = await getVersion(url.replace('/doc', ''))
      return {
        ...props,
        url,
        version,
        outdated: isOutdated(stagingVersion, version)
      }
    } catch (er) {
      return undefined
    }
  })

  return (await Promise.all(promises))
    .filter(Boolean)
    .sort((f1, f2) => {
      if (f1.outdated) {
        return 1
      }
      return -1
    })
}
