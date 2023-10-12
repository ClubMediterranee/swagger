import {Loader} from "@clubmed/ui/molecules/Loader";
import {System} from "../../interfaces/System";

export default function CustomStandaloneLayout(props: System) {
  const {getComponent, specSelectors} = props;
  const Container = getComponent("Container");
  const Topbar = getComponent("Topbar", true);
  const BaseLayout = getComponent("BaseLayout", true);

  const loadingStatus = specSelectors.loadingStatus();

  return (
    <Container className="swagger-ui">
      {Topbar ? <Topbar/> : null}
      {loadingStatus !== "loading" ? <BaseLayout/> : null}
      <Loader isVisible={loadingStatus === "loading"} label={"We're loading our documentation. It shouldn't take too long!"}/>
    </Container>
  );
}

