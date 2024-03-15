export function updateAllFields (state, paramIn, paramName, value) {
  state.get('json').get('paths').forEach((methods, path) => {
    methods.forEach((operation, method) => {
      if (operation.get('parameters')) {
        operation
          .get('parameters')
          .filter(parameter => parameter.get('in') === paramIn && parameter.get('name') === paramName)
          .forEach((parameter) => {
            let paramKey = `${parameter.get('in')}.${parameter.get('name')}`
            state = state.setIn(
              ['meta', 'paths', path, method, 'parameters', paramKey, 'value'],
              value
            )
          })
      }
    })
  })

  return state
}
