import { UPDATE_ADVANCED_FILTER } from "./actions";

export default {
  [UPDATE_ADVANCED_FILTER]: (state: any, action: any) => {
    return state.set("advancedFilters", action.payload);
  }
};
