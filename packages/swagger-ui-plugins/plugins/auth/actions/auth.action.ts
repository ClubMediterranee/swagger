import { fromJS } from "immutable";

import { System } from "../../../interfaces/System";
export const SET_CURRENT_AUTH = "set_current_auth";

export const setCurrentAuth = (auth: string) => {
  return {
    type: SET_CURRENT_AUTH,
    payload: { auth }
  };
};

export const wrapExecute =
  (oriAction: any, { authSelectors, specSelectors }: System) =>
  (opts: any) => {
    const auth = authSelectors.getCurrentAuth();
    // const securities = {
    //   authorized: authSelectors.authorized() && authSelectors.authorized().toJS(),
    //   definitions: specSelectors.securityDefinitions() && specSelectors.securityDefinitions()!.toJS(),
    //   specSecurity: specSelectors.security() && specSelectors.security().toJS()
    // };

    if (auth) {
      // opts.operation = opts.operation.toJS();
      // opts.operation.security = opts.operation.security.filter((security: any) => {
      //   return security === auth;
      // });
      // opts.operation = fromJS(opts.operation);
      // securities.authorized = {
      //   [auth]: securities.authorized[auth]
      // };
      // securities.definitions = {
      //   [auth]: securities.definitions[auth]
      // };
    }

    console.log(
      auth,
      'auth && opts.operation.getIn(["security", auth]) ? auth : undefined',
      auth && opts.operation.get("security").get(auth) ? auth : undefined,
      opts.operation.toJS()
    );

    return oriAction({
      ...opts,
      currentAuth: auth
    });
  };
