import { Markdown } from "../form/markdown";
import { SelectComponent } from "../form/select.component";
import { TextareaComponent } from "../form/textarea.component";
import { wrapJsonschemaStringComponent } from "../form/wrap-jsonschema-string.component";
import OperationSummary from "../operations/operation-summary.component";
import OperationTag from "../operations/operation-tag.component";
import { updateFields } from "../operations/reducers/update-fields.reducer.js";
import { wrapClear } from "../operations/wrap-clear";
import { wrapExecute } from "../operations/wrap-execute";
import { wrapOperation } from "../operations/wrap-operation";
import BaseLayout from "./base-layout.component";
import { HeroBanner } from "./hero-banner.component";

export const BaseLayoutPlugin = () => {
  return {
    statePlugins: {
      spec: {
        reducers: {
          spec_update_param: updateFields
        }
      }
    },
    components: {
      HeroBanner,
      BaseLayout,
      OperationSummary,
      OperationTag,
      Select: SelectComponent,
      TextArea: TextareaComponent,
      Markdown: Markdown
    },
    wrapComponents: {
      operation: wrapOperation,
      execute: wrapExecute,
      clear: wrapClear,
      JsonSchema_string: wrapJsonschemaStringComponent
    }
  };
};
