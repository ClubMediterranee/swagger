import React, { useEffect } from "react";

import { System } from "../../interfaces/System";
import { OperationsLoading } from "./operations-loading.component";

export default function BaseLayout(props: System) {
  const { errSelectors, specSelectors, getComponent } = props;
  const loadingStatus = specSelectors.loadingStatus();

  const [loading, setLoading] = React.useState(loadingStatus === "loading");
  const HeroBanner = getComponent("HeroBanner", true);

  useEffect(() => {
    if (loadingStatus === "loading") {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [loadingStatus]);

  if (loading) {
    const Row = getComponent("Row");
    const Col = getComponent("Col");
    return (
      <div className="swagger-ui">
        <HeroBanner {...props} />
        <div>
          <Row>
            <Col mobile={12} desktop={12}>
              <OperationsLoading />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  const SvgAssets = getComponent("SvgAssets");
  const VersionPragmaFilter = getComponent("VersionPragmaFilter");
  const Operations = getComponent("operations", true);
  const Models = getComponent("Models", true);
  const Webhooks = getComponent("Webhooks", true);
  const Row = getComponent("Row");
  const Col = getComponent("Col");
  const Errors = getComponent("errors", true);

  const isSwagger2 = specSelectors.isSwagger2();
  const isOAS3 = specSelectors.isOAS3();
  const isOAS31 = specSelectors.isOAS31();
  const isSpecEmpty = !specSelectors.specStr();

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
    return (
      <div className="swagger-ui">
        <HeroBanner {...props} />
        <div>
          <Row>
            <Col mobile={12} desktop={12}>
              {isSpecEmpty ? <OperationsLoading /> : loadingMessage}
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  if (loadingMessage) {
    return (
      <div className="swagger-ui">
        <HeroBanner {...props} />
        <div>
          <Row>
            <Col mobile={12} desktop={12}>
              {loadingMessage}
            </Col>
          </Row>
        </div>
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
