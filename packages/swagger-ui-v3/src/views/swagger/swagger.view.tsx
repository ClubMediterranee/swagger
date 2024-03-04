import {System} from "../../interfaces/System";
import {Loader} from "@clubmed/trident-ui/molecules/Loader";
import React, {useEffect} from "react";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

export function SwaggerView(props: System) {
  const {getComponent, specSelectors} = props;

  const BaseLayout = getComponent("BaseLayout", true);
  const loadingStatus = specSelectors.loadingStatus();

  const [loading, setLoading] = React.useState(loadingStatus === "loading");

  useEffect(() => {
    if (loadingStatus === "loading") {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [loadingStatus]);

  return <>
    {loadingStatus !== "loading" ? <BaseLayout/> : null}

    <Loader isVisible={loading}
            label={"We're loading our documentation. It shouldn't take too long!"}/>
  </>;
}

