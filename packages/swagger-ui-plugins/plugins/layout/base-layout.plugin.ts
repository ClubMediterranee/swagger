import { System } from "../../interfaces/System";
import { Markdown } from "../form/markdown.component";
import { SelectComponent } from "../form/select.component";
import { TextareaComponent } from "../form/textarea.component";
import { wrapJsonschemaStringComponent } from "../form/wrap-jsonschema-string.component";
import { wrapJsonschemaStringArrayComponent } from "../form/wrap-jsonschema-string-array.component";
import { wrapOperationSummary } from "../operations/operation-summary.component";
import OperationTag from "../operations/operation-tag.component";
import { updateFields } from "../operations/reducers/update-fields.reducer.js";
import { wrapRequestBody } from "../operations/request-body.component";
import { wrapResponseBody } from "../operations/response-body.component";
import { wrapClear } from "../operations/wrap-clear";
import { wrapExecute } from "../operations/wrap-execute";
import { wrapOperation } from "../operations/wrap-operation";
import BaseLayout from "./base-layout.component";
import { HeroBanner } from "./hero-banner.component";

export const BaseLayoutPlugin = (system: System) => {
  return {
    statePlugins: {
      spec: {
        reducers: {
          spec_update_param: updateFields
        },
        wrapReducers: {}
        // wrapSelectors: {
        //   parameterWithMetaByIdentity
        // }
      }
    },
    components: {
      HeroBanner,
      BaseLayout,
      OperationTag,
      Select: SelectComponent,
      TextArea: TextareaComponent,
      Markdown: Markdown
      //highlightCode: wrapHighlightComponent(system.getComponent("highlightCode"))
    },
    wrapComponents: {
      operation: wrapOperation,
      execute: wrapExecute,
      clear: wrapClear,
      responseBody: wrapResponseBody,
      RequestBody: wrapRequestBody,
      JsonSchema_string: wrapJsonschemaStringComponent,
      JsonSchema_array: wrapJsonschemaStringArrayComponent,
      OperationSummary: wrapOperationSummary
    }
  };
};
