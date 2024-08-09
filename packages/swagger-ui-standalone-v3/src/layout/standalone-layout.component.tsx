import type { System } from "@clubmed/swagger-ui-plugins/interfaces/System";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import { Footer } from "@clubmed/ui/organisms/Footer/Footer";
import React from "react";

export default function CustomStandaloneLayout(props: System) {
  const { getComponent } = props;
  const Container = getComponent("Container");
  const Topbar = getComponent("Topbar", true);
  const { config } = useConfig();
  const BaseLayout = props.getComponent("BaseLayout", true);

  return (
    <Container className="swagger-ui">
      {Topbar ? <Topbar /> : null}
      <div className="min-h-screen">
        <BaseLayout {...props} />
      </div>
      {config.footer ? <Footer {...config.footer} /> : null}
    </Container>
  );
}
