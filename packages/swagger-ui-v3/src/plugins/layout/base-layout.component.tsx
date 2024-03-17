import { useConfig } from "../../contexts/config.context";
import { System } from "../../interfaces/System";
import { ApiBanner } from "./api-banner.component";

export default function BaseLayout(props: System) {
  const { errSelectors, specSelectors, getComponent } = props;
  const { isApiLayout } = useConfig();

  const SvgAssets = getComponent("SvgAssets");
  const InfoContainer = getComponent("InfoContainer", true);
  const VersionPragmaFilter = getComponent("VersionPragmaFilter");
  const Operations = getComponent("operations", true);
  const Models = getComponent("Models", true);
  const Webhooks = getComponent("Webhooks", true);
  const Row = getComponent("Row");
  const Col = getComponent("Col");
  const Errors = getComponent("errors", true);

  const ServersContainer = getComponent("ServersContainer", true);
  const SchemesContainer = getComponent("SchemesContainer", true);
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

  const servers = specSelectors.servers();
  const schemes = specSelectors.schemes();

  const hasServers = servers && servers.size;
  const hasSchemes = schemes && schemes.size;

  return (
    <div>
      <SvgAssets />
      <VersionPragmaFilter isSwagger2={isSwagger2} isOAS3={isOAS3} alsoShow={<Errors />}>
        <Errors />
        <div className="relative xl:pb-0 sm:py-20 lg:py-40 text-black">
          <div className="-z-1 pointer-events-none absolute inset-0 xl:bottom-40 bg-lightSand" />

          {isApiLayout ? (
            <ApiBanner {...props} />
          ) : (
            <>
              <Row className="information-container">
                <Col mobile={12}>
                  <InfoContainer />
                </Col>
              </Row>

              {hasServers || hasSchemes ? (
                <div>
                  <div className="px-20 flex">
                    <div>{hasServers ? <ServersContainer /> : null}</div>
                    <div>{hasSchemes ? <SchemesContainer /> : null}</div>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>

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
