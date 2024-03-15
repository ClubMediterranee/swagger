import {DeviceProvider} from "@clubmed/trident-ui/contexts/Device";
import React, {Suspense} from "react";

export const isMobile = () => {
  return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

const LazySwaggerUI = React.lazy(() => import("./components/SwaggerUIContainer"));

function App() {
  return (
    <div className="App">
      <DeviceProvider device={isMobile() ? "mobile" : "desktop"}>
        { /* @ts-ignore */}
        <Suspense fallback={() => <></>}>
          <LazySwaggerUI/>
        </Suspense>
      </DeviceProvider>
    </div>
  );
}

export default App;
