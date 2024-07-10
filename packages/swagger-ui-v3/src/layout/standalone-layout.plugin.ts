import { DocHeroBanner } from "./doc-hero-banner.component";
import { RouterLink } from "./router-link.component";
import StandaloneLayout from "./standalone-layout.component";

export const StandaloneLayoutPlugin = () => {
  return {
    spec: {
      reducers: {
        // spec_update_spec: (state, action) => {
        //   console.log("spec_update_spec", action.payload);
        //   console.log(action.payload);
        //   return typeof action.payload === "string" ? state.set("spec", "{}") : state;
        // }
      }
    },
    components: {
      HeroBanner: DocHeroBanner,
      StandaloneLayout,
      RouterLink
    }
  };
};
