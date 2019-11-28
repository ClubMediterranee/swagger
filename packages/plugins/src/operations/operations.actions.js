export const UPDATE_FILTER = 'operations_update_filter'

export function updateFilter (filter) {
  return {
    type: UPDATE_FILTER,
    payload: filter
  }
}
