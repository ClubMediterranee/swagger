import { System } from "@clubmed/swagger-ui-plugins/interfaces/System";
import { List, OrderedMap } from "immutable";

import * as webhooks from "../../../docs/webhooks.md";
import { Page } from "../../components/page.component";

function WebhookRoutes(props: System) {
  const { specSelectors, getComponent } = props;

  const SvgAssets = getComponent("SvgAssets");
  const VersionPragmaFilter = getComponent("VersionPragmaFilter");
  const OperationContainer = getComponent("OperationContainer", true);
  const Row = getComponent("Row");
  const Col = getComponent("Col");
  const Errors = getComponent("errors", true);

  const isSwagger2 = specSelectors.isSwagger2();
  const isOAS3 = specSelectors.isOAS3();
  const isSpecEmpty = !specSelectors.specStr();

  if (isSpecEmpty) {
    return (
      <div className="swagger-ui">
        <div className="loading-container">Loading in progress...</div>
      </div>
    );
  }

  let taggedOps = specSelectors.taggedOperations();

  if (taggedOps.size === 0) {
    return <h3> No operations defined in spec!</h3>;
  }

  const operations = taggedOps.get("webhooks")!.get("operations") as unknown as List<OrderedMap<string, any>>;

  return (
    <div>
      <SvgAssets />
      <VersionPragmaFilter isSwagger2={isSwagger2} isOAS3={isOAS3} alsoShow={<Errors />}>
        <Errors />

        <Row>
          <Col mobile={12} desktop={12}>
            <h3 className={"font-serif text-h3"}>Routes</h3>

            <div className="operation-tag-content">
              {operations
                .map((op) => {
                  const path = op!.get("path");
                  const method = op!.get("method");
                  const specPath = List(["paths", path, method]);

                  return (
                    <OperationContainer
                      key={`${path}-${method}`}
                      specPath={specPath}
                      op={op}
                      path={path}
                      method={method}
                      tag={"webhooks"}
                    />
                  );
                })
                .toArray()}
            </div>
          </Col>
        </Row>
      </VersionPragmaFilter>
    </div>
  );
}

export default function WebhooksView(props: System) {
  const { getComponent } = props;
  const Row = getComponent("Row");
  const Col = getComponent("Col");

  return (
    <div>
      <Page attributes={webhooks.attributes} html={webhooks.html} />
      <br />
      <br />
      <WebhookRoutes {...props} />
    </div>
  );
}
