import StandaloneLayout from "./custom-standalone-layout.component";
import BaseLayout from "./base-layout.component";
import AuthorizeBtn from "../auth/authorize-btn.component";
import OperationTag from "../operations/operation-tag.component";
import {System} from "../../interfaces/System";

export const StandaloneLayoutPlugin = (system: System) => {
  return {
    components: {
      StandaloneLayout,
      BaseLayout,
      authorizeBtn: AuthorizeBtn,
      OperationTag
    }
  };
};
