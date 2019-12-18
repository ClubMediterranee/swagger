export const UPDATE_FILTER = 'operations_update_filter'
export const UPDATE_DEPRECATE_FILTER = 'operations_deprecated_filter'

export function updateFilter (filter) {
  return {
    type: UPDATE_FILTER,
    payload: filter
  }
}

export function updateDeprecatedFilter (filter) {
  return {
    type: UPDATE_DEPRECATE_FILTER,
    payload: filter
  }
}
