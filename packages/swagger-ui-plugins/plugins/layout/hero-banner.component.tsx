import { System } from "../../interfaces/System";

export function HeroBanner(props: System) {
  const { specSelectors, getComponent } = props;

  const InfoContainer = getComponent("InfoContainer", true);
  const Row = getComponent("Row");
  const Col = getComponent("Col");
  const servers = specSelectors.servers();
  const schemes = specSelectors.schemes();
  const ServersContainer = getComponent("ServersContainer", true);
  const SchemesContainer = getComponent("SchemesContainer", true);
  const hasServers = servers && servers.size;
  const hasSchemes = schemes && schemes.size;

  return (
    <div className="relative py-20 text-black bg-lightSand">
      <Row className="information-container">
        <Col mobile={12}>
          <InfoContainer />
        </Col>

        {hasServers || hasSchemes ? (
          <Col mobile={12}>
            <div className="px-20 flex">
              <div>{hasServers ? <ServersContainer /> : null}</div>
              <div>{hasSchemes ? <SchemesContainer /> : null}</div>
            </div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
}
