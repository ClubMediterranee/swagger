export const current = state => state.get('layout')

export const currentFilter = state => state.get('filter')
export const currentTagsFilter = state => state.get('tagsFilter') || {}
