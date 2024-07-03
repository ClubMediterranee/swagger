import { DocHeroBanner } from "./doc-hero-banner.component";
import { RouterLink } from "./router-link.component";
import StandaloneLayout from "./standalone-layout.component";

export const StandaloneLayoutPlugin = () => {
  return {
    components: {
      HeroBanner: DocHeroBanner,
      StandaloneLayout,
      RouterLink
    }
  };
};
