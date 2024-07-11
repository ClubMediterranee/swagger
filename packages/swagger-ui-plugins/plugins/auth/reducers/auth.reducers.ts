import { Map } from "immutable";

import { SET_CURRENT_AUTH } from "../actions/auth.action";

export const authReducers = {
  [SET_CURRENT_AUTH]: (state: any, { payload }: { payload: { auth: string } }) => {
    return state.set("currentAuth", payload.auth);
  }
};
