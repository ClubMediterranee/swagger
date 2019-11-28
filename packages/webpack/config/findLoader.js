function matchLoader (item, name) {
  return item.loader && item.loader.indexOf(name) > -1
}

module.exports = (webpackConfig, name) => {
  if (webpackConfig.module && webpackConfig.module.rules) {
    for (const rule of webpackConfig.module.rules) {
      if (rule.oneOf) {

        for (const oneOf of rule.oneOf) {
          if (matchLoader(oneOf, name)) {
            return oneOf
          }

          if (oneOf.use) {
            for (const item of oneOf.use) {

              if (matchLoader(item, name)) {
                return item
              }
            }
          }
        }
      }

      if (rule.use) {
        for (const item of rule.use) {
          if (matchLoader(item, name)) {
            return rule
          }
        }
      }
    }
  }
}
