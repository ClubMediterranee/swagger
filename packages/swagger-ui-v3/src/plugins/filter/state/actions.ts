export const  UPDATE_ADVANCED_FILTER = "UPDATE_ADVANCED_FILTER";

export function updateAdvancedFilters(filters: any) {
  return {
    type: UPDATE_ADVANCED_FILTER,
    payload: filters
  }
}
