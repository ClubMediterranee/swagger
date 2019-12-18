import { UPDATE_DEPRECATE_FILTER, UPDATE_FILTER } from './operations.actions'

export default {
  [UPDATE_FILTER]: (state, action) => state.set('filter', action.payload),
  [UPDATE_DEPRECATE_FILTER]: (state, action) => state.set('deprecatedFilter', action.payload)
}
