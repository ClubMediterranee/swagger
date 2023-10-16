import StandaloneLayout from "./custom-standalone-layout.component";
import BaseLayout from "./base-layout.component";
import AuthorizeBtn from "../auth/authorize-btn.component";
import {wrapOperation} from "../operations/wrap-operation";
import OperationSummary from "../operations/operation-summary.component";
import OperationTag from "../operations/operation-tag.component";
import {AuthorizeOperationBtn} from "../auth/authorize-operation-btn.component";
import {wrapExecute} from "../operations/wrap-execute";
import {wrapClear} from "../operations/wrap-clear";

export const StandaloneLayoutPlugin = () => {
  return {
    components: {
      StandaloneLayout,
      BaseLayout,
      authorizeBtn: AuthorizeBtn,
      authorizeOperationBtn: AuthorizeOperationBtn,
      OperationSummary,
      OperationTag
    },
    wrapComponents: {
      operation: wrapOperation,
      execute: wrapExecute,
      clear: wrapClear
    }
  };
};
