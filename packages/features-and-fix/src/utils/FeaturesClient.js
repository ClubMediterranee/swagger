import axios from 'axios'
import { createElementFromFragment } from './createElementFromFragment'
import { getInnerFeatures } from './getInnerFeatures'
import { getSettings } from './settings'

const versions = new Map()

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

export async function getVersion (url, date) {
  if (versions.has(url)) {
    const item = versions.get(url)

    if (item.date === date) {
      return versions.get(url).version
    }
  }

  console.log('[DEV] Fetch version for API:', url)
  const { api_key } = getSettings()

  if (api_key) {
    const { data } = await axios.get(`${url}/v0/version?api_key=${api_key}`)

    versions.set(url, {
      date,
      version: data['@clubmed/digital-api']
    })

    return data['@clubmed/digital-api']
  }
  return null
}

export async function getStagingVersion () {
  return getVersion(window.appConfig.stagingUrl)
}

export async function fetchFeatures () {
  const { data } = await axios(window.location + '?timestamp=' + Date.now())

  return getInnerFeatures(createElementFromFragment(data))
}

export async function getFeatures () {
  const [features, stagingVersion] = await Promise.all([
    fetchFeatures(),
    getStagingVersion()
  ])

  const promises = features.map(async ({ url, date, ...props }) => {
    try {
      const version = await getVersion(url.replace('/doc', ''), date)

      if (!version) {
        return null
      }

      return {
        ...props,
        date,
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
