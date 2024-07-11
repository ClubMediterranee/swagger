import { Map } from "immutable";
import { createSelector } from "reselect";

const state = (state: any) => {
  return state || Map();
};

export const getCurrentAuth = createSelector(state, (auth) => {
  return auth.get("currentAuth") || (auth.get("authorized") as Map<string, string>)?.keySeq()?.first() || "";
});
