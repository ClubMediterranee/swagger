import { setStorageValue } from "@clubmed/ui/hooks/storage/useLocaleStorage";
import { type Map, Set } from "immutable";

import { ADD_TO_BOOKMARKS, REMOVE_FROM_BOOKMARKS, UPDATE_ADVANCED_FILTER } from "./actions";

export default {
  [UPDATE_ADVANCED_FILTER]: (state: any, action: any) => {
    return state.set("advancedFilters", action.payload);
  },
  [ADD_TO_BOOKMARKS]: (state: Map<string, any>, { payload: operationId }: { payload: string }) => {
    const bookmarks = (state.get("bookmarks") || Set()).add(operationId);

    setStorageValue("bookmarks", bookmarks.toJS());

    return state.set("bookmarks", bookmarks);
  },
  [REMOVE_FROM_BOOKMARKS]: (state: Map<string, any>, { payload: operationId }: { payload: string }) => {
    const bookmarks = (state.get("bookmarks") || Set()).remove(operationId);

    setStorageValue("bookmarks", bookmarks.toJS());

    return state.set("bookmarks", bookmarks);
  }
};
