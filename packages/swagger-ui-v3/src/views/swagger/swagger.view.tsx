import {System} from "../../interfaces/System";
import {Loader} from "@clubmed/ui/molecules/Loader";
import React from "react";

export function SwaggerView(props: System) {
  const {getComponent, specSelectors} = props;

  const BaseLayout = getComponent("BaseLayout", true);
  const loadingStatus = specSelectors.loadingStatus();

  return <>
    {loadingStatus !== "loading" ? <BaseLayout/> : null}

    <Loader isVisible={loadingStatus === "loading"}
            label={"We're loading our documentation. It shouldn't take too long!"}/>
  </>;
}

