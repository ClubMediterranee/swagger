import { Set } from 'immutable'
import { UPDATE_TAGS_FILTER, UPDATE_FILTER, TOGGLE_BOOKMARK } from './operations.actions'
import { getKey, setKey } from '../common/localeStorage'

export const LOCALE_STORAGE_BOOKMARK_KEY = 'bookmarks'

export default {
  [UPDATE_FILTER]: (state, action) => state.set('filter', action.payload),
  [UPDATE_TAGS_FILTER]: (state, action) => state.set('tagsFilter', action.payload),
  [TOGGLE_BOOKMARK]: (state, action) => {
    const bookmarkState = state.get('bookmarks') ||
      Set(getKey(LOCALE_STORAGE_BOOKMARK_KEY))

    const newBookmarkState = bookmarkState.includes(action.payload)
      ? bookmarkState.delete(action.payload)
      : bookmarkState.add(action.payload)

    setKey(LOCALE_STORAGE_BOOKMARK_KEY, newBookmarkState.toArray())

    const newState = state.set('bookmarks', newBookmarkState)
    return state.equals(newState)
      ? state
      : newState
  },
  spec_update_json: (state) => {
    return state.set('bookmarks', Set(getKey(LOCALE_STORAGE_BOOKMARK_KEY)))
  }
}
