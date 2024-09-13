export const UPDATE_ADVANCED_FILTER = "UPDATE_ADVANCED_FILTER";
export const ADD_TO_BOOKMARKS = "ADD_TO_BOOKMARKS";
export const REMOVE_FROM_BOOKMARKS = "REMOVE_FROM_BOOKMARKS";

export function updateAdvancedFilters(filters: any) {
  return {
    type: UPDATE_ADVANCED_FILTER,
    payload: filters
  };
}

export function addToBookmarks(operationId: string) {
  return {
    type: ADD_TO_BOOKMARKS,
    payload: operationId
  };
}

export function removeFromBookmarks(operationId: string) {
  return {
    type: REMOVE_FROM_BOOKMARKS,
    payload: operationId
  };
}
