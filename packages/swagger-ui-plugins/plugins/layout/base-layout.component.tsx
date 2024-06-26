import { System } from "../../interfaces/System";

export default function BaseLayout(props: System) {
  const { errSelectors, specSelectors, getComponent } = props;

  const SvgAssets = getComponent("SvgAssets");
  const VersionPragmaFilter = getComponent("VersionPragmaFilter");
  const Operations = getComponent("operations", true);
  const Models = getComponent("Models", true);
  const Webhooks = getComponent("Webhooks", true);
  const Row = getComponent("Row");
  const Col = getComponent("Col");
  const HeroBanner = getComponent("HeroBanner", true);
  const Errors = getComponent("errors", true);

  const isSwagger2 = specSelectors.isSwagger2();
  const isOAS3 = specSelectors.isOAS3();
  const isOAS31 = specSelectors.isOAS31();

  const isSpecEmpty = !specSelectors.specStr();

  const loadingStatus = specSelectors.loadingStatus();

  let loadingMessage = null;

  if (loadingStatus === "failed") {
    loadingMessage = (
      <div className="info">
        <div className="loading-container">
          <h4 className="title">Failed to load API definition.</h4>
          <Errors />
        </div>
      </div>
    );
  }

  if (loadingStatus === "failedConfig") {
    const lastErr = errSelectors.lastError();
    const lastErrMsg = lastErr ? lastErr.get("message") : "";
    loadingMessage = (
      <div className="info failed-config">
        <div className="loading-container">
          <h4 className="title">Failed to load remote configuration.</h4>
          <p>{lastErrMsg}</p>
        </div>
      </div>
    );
  }

  if (!loadingMessage && isSpecEmpty) {
    loadingMessage = <h4>No API definition provided.</h4>;
  }

  if (loadingMessage) {
    return (
      <div className="swagger-ui">
        <div className="loading-container">{loadingMessage}</div>
      </div>
    );
  }

  return (
    <div>
      <SvgAssets />
      <VersionPragmaFilter isSwagger2={isSwagger2} isOAS3={isOAS3} alsoShow={<Errors />}>
        <Errors />

        <HeroBanner {...props} />

        <Row>
          <Col mobile={12} desktop={12}>
            <Operations />
          </Col>
        </Row>

        {isOAS31 && (
          <Row className="webhooks-container">
            <Col mobile={12} desktop={12}>
              <Webhooks />
            </Col>
          </Row>
        )}

        <Row>
          <Col mobile={12} desktop={12}>
            <Models />
          </Col>
        </Row>
      </VersionPragmaFilter>
    </div>
  );
}
