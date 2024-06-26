import { Markdown } from "../form/markdown";
import { SelectComponent } from "../form/select.component";
import { TextareaComponent } from "../form/textarea.component";
import { updateFields } from "../operations/reducers/update-fields.reducer";
import { authPopup, logoutPopup } from "./auth-popup.action";
import { AuthorizationPopup } from "./authorization-popup.component";
import AuthorizeBtn from "./authorize-btn.component";
import { AuthorizeOperationBtn } from "./authorize-operation-btn.component";
import { Oauth2Component } from "./oauth2.component";

export const Oauth2Plugin = () => {
  return {
    statePlugins: {
      spec: {
        reducers: {
          spec_update_param: updateFields
        }
      },
      auth: {
        actions: {
          authPopup,
          logoutPopup
        }
      }
    },
    components: {
      authorizeBtn: AuthorizeBtn,
      authorizeOperationBtn: AuthorizeOperationBtn,
      authorizationPopup: AuthorizationPopup,
      oauth2: Oauth2Component,
      Select: SelectComponent,
      TextArea: TextareaComponent,
      Markdown: Markdown
    }
  };
};
