import StandaloneLayout from "./custom-standalone-layout.component";
import BaseLayout from "./base-layout.component";

export const StandaloneLayoutPlugin = () => {
  return {
    components: {
      StandaloneLayout,
      BaseLayout,
      // ModelsView,
      // OperationsView,
      // Select
    }
  };
};
