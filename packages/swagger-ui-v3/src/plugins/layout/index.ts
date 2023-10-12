import StandaloneLayout from "./custom-standalone-layout.component";
import BaseLayout from "./base-layout.component";
import AuthorizeBtn from "../auth/authorize-btn.component";
import FilterContainer from "../filter/filter.container";
import OperationTag from "../operations/operation-tag.component";

export const StandaloneLayoutPlugin = () => {
  return {
    components: {
      StandaloneLayout,
      BaseLayout,
      authorizeBtn: AuthorizeBtn,
      FilterContainer,
      OperationTag
      // ModelsView,
      // OperationsView,
      // Select
    }
  };
};
