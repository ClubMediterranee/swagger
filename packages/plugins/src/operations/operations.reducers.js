import { UPDATE_FILTER } from './operations.actions'

export default {
  [UPDATE_FILTER]: (state, action) => state.set('filter', action.payload)
}
