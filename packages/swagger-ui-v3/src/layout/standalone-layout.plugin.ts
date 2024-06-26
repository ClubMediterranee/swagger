import { HeroBanner } from "./hero-banner.component";
import StandaloneLayout from "./standalone-layout.component";

export const StandaloneLayoutPlugin = () => {
  return {
    components: {
      HeroBanner,
      StandaloneLayout
    }
  };
};
