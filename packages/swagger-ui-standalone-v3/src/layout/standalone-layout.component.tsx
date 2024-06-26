import { useConfig } from "@clubmed/swagger-ui-plugins/contexts/config.context";
import { System } from "@clubmed/swagger-ui-plugins/interfaces/System";
import { SwaggerView } from "@clubmed/swagger-ui-plugins/views/swagger.view";
import { Footer } from "@clubmed/ui/organisms/Footer/Footer";

export default function CustomStandaloneLayout(props: System) {
  const { getComponent } = props;
  const Container = getComponent("Container");
  const Topbar = getComponent("Topbar", true);
  const config = useConfig();

  return (
    <Container className="swagger-ui">
      {Topbar ? <Topbar /> : null}
      <SwaggerView {...props} />
      {config.footer ? <Footer {...config.footer} /> : null}
    </Container>
  );
}
