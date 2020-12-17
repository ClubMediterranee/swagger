'use strict'

const fse = require('fs-extra')
const path = require('path')
const findUp = require('find-up')
const glob = require('glob')
const chalk = require('chalk')
const pkgName = require('../package').name

const loadPackageJson = packagePath => {
  return fse.readJsonSync(packagePath)
}

const getWorkspacesRootConfig = dir => {
  const packageJsonUp = findUp.sync('package.json', { cwd: dir })

  if (packageJsonUp === null) {
    return false
  }

  const packageObj = loadPackageJson(packageJsonUp)

  if (Reflect.has(packageObj, 'workspaces')) {
    return {
      root: path.dirname(packageJsonUp),
      workspaces: packageObj.workspaces
    }
  }

  const dirUp = path.dirname(dir)
  return getWorkspacesRootConfig(dirUp)
}

const getDeep = (obj, keyChain) => {
  const nextKey = keyChain.shift()
  const has = Reflect.has(obj, nextKey)
  const val = obj[nextKey]

  if (keyChain.length === 0) {
    return val
  }

  if (has) {
    return getDeep(val, keyChain)
  }

  return false
}

const loadAppSettings = appPackageJson => {
  const result = { workspaces: {}, dependencies: {} }

  const appPackageObj = loadPackageJson(appPackageJson)

  const dependencies = getDeep(appPackageObj, ['dependencies'])
  const devDependencies = getDeep(appPackageObj, ['devDependencies'])

  if (!dependencies && !devDependencies) return result

  if (dependencies) {
    result.dependencies = Object.assign(result.dependencies, dependencies)
  }

  if (devDependencies) {
    result.dependencies = Object.assign(
      result.dependencies,
      devDependencies
    )
  }

  const reactScripts = getDeep(appPackageObj, ['react-scripts'])
  if (!reactScripts) return result

  const workspaces = getDeep(reactScripts, ['workspaces'])
  result.workspaces = workspaces

  if (!workspaces) {
    return result
  }

  return workspaces
}

const guard = (appDirectory, appPackageJson) => {
  if (!appDirectory) {
    throw new Error('appDirectory not provided')
  }

  if (typeof appDirectory !== 'string') {
    throw new Error('appDirectory should be a string')
  }

  if (!appPackageJson) {
    throw new Error('appPackageJson not provided')
  }

  if (typeof appPackageJson !== 'string') {
    throw new Error('appPackageJson should be a string')
  }
}

const getPkg = path => {
  const pkgPath = findUp.sync('package.json', { cwd: path })
  return loadPackageJson(pkgPath)
}

const getDeps = pkg => {
  const deps = getDeep(pkg, ['dependencies'])
  const devDeps = getDeep(pkg, ['devDependencies'])

  let dependencies = {}

  if (deps) {
    dependencies = Object.assign(dependencies, deps)
  }

  if (devDeps) {
    dependencies = Object.assign(dependencies, devDeps)
  }

  return dependencies
}

const depsTable = {}

const buildDepsTable = srcPaths => {
  srcPaths.forEach(path => {
    const pkg = getPkg(path)
    const name = pkg.name
    const deps = getDeps(pkg)
    depsTable[name] = { path, deps }
  })
}

const filterSrcPaths = (srcPaths, dependencies) => {
  return srcPaths.reduce((paths, path) => {
    const pkg = getPkg(path)

    if (dependencies && Reflect.has(dependencies, pkg.name) && pkg.name !== pkgName) {
      paths.push(path)

      const { deps } = depsTable[pkg.name]

      paths.push(...filterSrcPaths(srcPaths, deps))
    }

    return paths
  }, [])
}

const init = paths => {
  guard(paths.appPath, paths.appPackageJson)

  const config = {
    root: null,
    paths: [],
    packageEntry: 'main:src',
    development: true,
    production: true
  }

  const { root, workspaces } = getWorkspacesRootConfig(paths.appPath)
  const workspacesList = []

  // Normally "workspaces" in package.json is an array
  if (Array.isArray(workspaces)) {
    workspacesList.push(...workspaces)
  }

  // Sometimes "workspaces" in package.json is an object
  // with a ".packages" sub-array, eg: when used with "nohoist"
  // See: https://yarnpkg.com/blog/2018/02/15/nohoist
  if (workspaces && !Array.isArray(workspaces) && Reflect.has(workspaces, 'packages')) {
    workspacesList.push(...workspaces.packages)
  }

  if (workspacesList.length === 0) {
    return config
  }
  // console.log('Yarn Workspaces paths detected.')
  config.root = root

  const appSettings = loadAppSettings(paths.appPackageJson)

  if (Reflect.has(appSettings.workspaces, 'development')) {
    config.development = !!appSettings.workspaces.development
  }

  if (Reflect.has(appSettings.workspaces, 'production')) {
    config.production = !!appSettings.workspaces.production
  }

  if (Reflect.has(appSettings.workspaces, 'package-entry')) {
    config.packageEntry = appSettings.workspaces['package-entry']
  }

  const srcPaths = workspacesList
    .reduce((paths, dir) =>
      paths.concat(glob.sync(path.join(root, dir))), [])

  buildDepsTable(srcPaths)

  const applicableSrcPaths = filterSrcPaths(
    srcPaths,
    appSettings.dependencies,
    paths.appPath
  )

  console.log(chalk.green(`Found ${applicableSrcPaths.length} path(s) entry.`))

  if (applicableSrcPaths.length > 0) {
    config.paths.push(...applicableSrcPaths.map((p) => path.resolve(p)))
  }

  console.log(chalk.green('Exporting Workspaces config to Webpack.'))
  // console.log(config)
  return config
}

exports.init = init
exports.getWorkspacesRootConfig = getWorkspacesRootConfig
