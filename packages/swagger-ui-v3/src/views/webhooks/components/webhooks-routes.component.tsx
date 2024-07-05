import type { System } from "@clubmed/swagger-ui-plugins/interfaces/System";
import { List } from "immutable";

export function WebhookRoutes(props: System) {
  const { specSelectors, getComponent } = props;

  const SvgAssets = getComponent("SvgAssets");
  const VersionPragmaFilter = getComponent("VersionPragmaFilter");
  const OperationContainer = getComponent("OperationContainer", true);
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

  const webhooksOperations = specSelectors.operationsWithTags().get("webhooks")!;

  return (
    <div>
      <SvgAssets />
      <VersionPragmaFilter isSwagger2={isSwagger2} isOAS3={isOAS3} alsoShow={<Errors />}>
        <Errors />

        <h2 id="Routes" className="page-h2">
          Routes
        </h2>

        <div className="operation-tag-content">
          {webhooksOperations
            .map((op) => {
              const path = op!.get("path");
              const method = op!.get("method");
              const specPath = List(["paths", path, method]);

              return (
                <OperationContainer key={`${path}-${method}`} specPath={specPath} op={op} path={path} method={method} tag={"webhooks"} />
              );
            })
            .toArray()}
        </div>
      </VersionPragmaFilter>
    </div>
  );
}
