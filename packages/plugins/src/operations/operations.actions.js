export const UPDATE_FILTER = 'operations_update_filter'
export const UPDATE_TAGS_FILTER = 'operations_tags_filter'
export const TOGGLE_BOOKMARK = 'operations_bookmark_toggle'

export function updateFilter (filter) {
  return {
    type: UPDATE_FILTER,
    payload: filter
  }
}

export function updateTagsFilter (filter) {
  return {
    type: UPDATE_TAGS_FILTER,
    payload: filter
  }
}

export function toggleBookmark (operationId) {
  return {
    type: TOGGLE_BOOKMARK,
    payload: operationId
  }
}
