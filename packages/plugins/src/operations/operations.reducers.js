import { UPDATE_TAGS_FILTER, UPDATE_FILTER } from './operations.actions'

export default {
  [UPDATE_FILTER]: (state, action) => state.set('filter', action.payload),
  [UPDATE_TAGS_FILTER]: (state, action) => state.set('tagsFilter', action.payload)
}
