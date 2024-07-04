import React from "react";

import { System } from "../interfaces/System";

export function SwaggerView(props: System) {
  const BaseLayout = props.getComponent("BaseLayout", true);

  return <BaseLayout />;
}

export default SwaggerView;
