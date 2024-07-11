import { System } from "../../interfaces/System";
import { updateFields } from "../operations/reducers/update-fields.reducer";
import { setCurrentAuth, wrapExecute } from "./actions/auth.action";
import { authPopup, logoutPopup } from "./actions/auth-popup.action";
import { AuthSelectComponent } from "./auth-select.component";
import { AuthorizationPopup } from "./authorization-popup.component";
import AuthorizeBtn from "./authorize-btn.component";
import { AuthorizeOperationBtn } from "./authorize-operation-btn.component";
import { Oauth2Component } from "./oauth2.component";
import { authReducers } from "./reducers/auth.reducers";
import { getCurrentAuth } from "./selectors/auth.selectors";

export const Oauth2Plugin = (system: System) => {
  const {
    fn: { buildRequest }
  } = system;
  return {
    statePlugins: {
      spec: {
        reducers: {
          spec_update_param: updateFields
        },
        wrapActions: {
          execute: (orig: any, s: any) => (opts: any) => {
            system = s;
            return orig(opts);
          }
        }
      },
      auth: {
        reducers: authReducers,
        selectors: {
          getCurrentAuth
        },
        actions: {
          authPopup,
          logoutPopup,
          setCurrentAuth
        }
      }
    },
    components: {
      authorizeBtn: AuthorizeBtn,
      authorizeOperationBtn: AuthorizeOperationBtn,
      authorizationPopup: AuthorizationPopup,
      oauth2: Oauth2Component,
      AuthSelect: AuthSelectComponent
    },
    fn: {
      buildRequest(opts: any) {
        const auth = system.authSelectors.getCurrentAuth();
        if (auth && opts.securities) {
          opts.securities.authorized = {
            [auth]: opts.securities.authorized[auth]
          };
          opts.securities.definitions = {
            [auth]: opts.securities.definitions[auth]
          };
        }

        return buildRequest(opts);
      }
    }
  };
};
