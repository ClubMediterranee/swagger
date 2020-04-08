import axios from 'axios'
import { Url } from './url'
import { qs } from './qs'
import { createElementFromFragment } from './createElementFromFragment'
import { getSettings } from './settings'

const getBaseUrl = (id, token, path) => {
  const url = Url.parse(path.startsWith('http') ? path : `http://${path}`)
  const protocol = url.protocol || 'http:'
  const port = url.port ? `:${url.port}` : ''

  return `${protocol}//${url.hostname}${port}${url.pathname}`
}

const get = async (url, headers, raw = false) => {
  const result = await axios.get(url, { headers })
  if (raw) return result
  return result.data
}

const post = (url, payload, headers) => {
  return axios.post(url, payload, {
    headers
  })
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export function getBranch (actions, tag) {
  let branch

  actions
    .filter((item) => item.parameters)
    .find((item) => {
      const actionBranch = item.parameters.find(item => item.name === tag)

      if (actionBranch) {
        branch = actionBranch.value
        return true
      }

      return false
    })

  return branch
}

export let jenkinsClient

export function createJenkinsClient () {
  const settings = getSettings()
  jenkinsClient = new JenkinsClient({
    id: settings.login,
    token: settings.password,
    path: window.appConfig.jenkinsUrl
  })

  return jenkinsClient
}

export class JenkinsClient {
  constructor ({ id, token, path, customHeaders, useCrumb = true }) {
    this.useCrumb = useCrumb
    this.token = token
    this.baseUrl = getBaseUrl(id, token, path)
    this.urlParams = {}
    this.headers = {
      Authorization: `Basic ${window.btoa(`${id}:${token}`)}`,
      ...customHeaders
    }
    this.crumb = null
  }

  async info (job = null) {
    if (job) {
      return get(...await this._getRequest(`/job/${job}/api/json`))
    }
    return get(...await this._getRequest('/api/json'))
  }

  async getJobInfo (job) {
    const [jobInfo, parameters] = await Promise.all([
      this.info(job),
      this.getParameters(job)
    ])

    const action = jobInfo.actions
      .find((action) => action && action.parameterDefinitions && action.parameterDefinitions.length)

    return {
      ...jobInfo,
      defaultParameter: action && action.parameterDefinitions && action.parameterDefinitions[0] && action.parameterDefinitions[0].name,
      parameters
    }
  }

  async getParameters (job) {
    let data
    try {
      const response = await get(...await this._getRequest(`/job/${job}/build`), true)
      data = response.data
    } catch (e) {
      if (e.response && e.response.status === 405) {
        data = e.response.data
      }
    }

    const el = createElementFromFragment(data)

    if (el) {
      const parametersEls = el.querySelectorAll('form[name=parameters] div[name=parameter]')

      return Array
        .from(parametersEls.values())
        .reduce((list, paramEl) => {
          const nameEl = paramEl.querySelector('input[name=name]')
          const choicesEl = paramEl.querySelector('select[name=value]')

          const choices = []

          if (choicesEl) {
            Array.from(choicesEl.querySelectorAll('option').values())
              .forEach((option) => {
                choices.push({
                  value: option.value,
                  label: option.innerHTML
                })
              })
          }

          return list.concat({
            name: nameEl.value,
            choices
          })
        }, [])
    }
  }

  async getBuildInfo (job, buildNumber) {
    return get(...await this._getRequest(`/job/${job}/${buildNumber}/api/json`))
  }

  async getJobConfig (job) {
    return get(...await this._getRequest(`/job/${job}/config.xml`))
  }

  async build (job) {
    const [url, headers] = await this._getRequest(`/job/${job}/build`)
    return post(url, null, headers)
  }

  async buildWithParams (job, parameters) {
    const [url, headers] = await this._getRequest(`/job/${job}/buildWithParameters`, parameters)

    return post(url, {}, headers)
  }

  async progressiveText (job, id, showLogs = true, interval = 100) {
    let isBuilding = true
    let offset = 0
    let text = ''
    while (isBuilding) {
      try {
        const [url] = await this._getRequest(job, `/job/${id}/logText/progressiveText`)
        const result = await get(`${url}&start=${offset}`, this.headers, true)
        if (result.status === 404) throw new Error(404)
        const { data } = result
        isBuilding = result.headers['x-more-data']
        offset = result.headers['x-text-size']
        text += data
        if (data && showLogs) console.log(data) // eslint-disable-line
        await sleep(interval)
      } catch (e) {
        if (e.message !== '404') throw new Error(e)
      }
    }

    const lines = text.split('\n')
    return lines[lines.length - 2]
  }

  async _getCrumb () {
    if (!this.useCrumb) {
      return {}
    }
    if (this.crumb) {
      return this.crumb
    }

    const url = `${this.baseUrl}/crumbIssuer/api/json`

    try {
      this.crumb = await get(url, {
        ...this.headers
      })

      return {
        [this.crumb.crumbRequestField]: this.crumb.crumb
      }
    } catch (er) {
      this.useCrumb = false
      if (er && er.response && er.response.status === 404) {
        return {}
      }

      throw er
    }
  }

  async _getRequest (endpoint, params = null) {
    const url = `${this.baseUrl}${endpoint}`

    const crumb = await this._getCrumb()

    const headers = {
      ...this.headers,
      ...crumb
    }

    params = {
      ...this.urlParams,
      ...params || {}
    }

    return [
      [url, qs.stringify(params)].filter(Boolean).join('?'),
      headers
    ]
  }

  toString () {
    return `<Jenkins ${this.token}>`
  }
}
