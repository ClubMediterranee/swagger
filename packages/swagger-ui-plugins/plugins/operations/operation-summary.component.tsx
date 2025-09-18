import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { variants } from "@clubmed/trident-ui/molecules/Buttons/Button.helpers";
import { FunctionComponent } from "react";

import { System } from "../../interfaces/System";

(variants as any)["iconSmall"] = "h-32 w-32 flex items-center justify-center";

export function wrapOperationSummary(Base: FunctionComponent, system: System) {
  return (props: any) => {
    return <OperationSummary {...system} {...props} />;
  };
}

export default function OperationSummary(
  props: System & { isShown: boolean; toggleShown: () => void; operationProps: Record<string, any> }
) {
  let { isShown, toggleShown, getComponent, authActions, authSelectors, operationProps, specPath } = props;

  let { summary, isAuthorized, method, op, showSummary, path, operationId, originalOperationId, displayOperationId } =
    operationProps.toJS() as any;

  const isBookmarked = props.layoutSelectors.getBookmarks()?.has(method + "-" + path);

  let { summary: resolvedSummary } = op;

  let security = operationProps.get("security");

  const AuthorizeOperationBtn = getComponent("authorizeOperationBtn", true);
  const OperationSummaryMethod = getComponent("OperationSummaryMethod");
  const OperationSummaryPath = getComponent("OperationSummaryPath");
  const JumpToPath = getComponent("JumpToPath", true);
  const CopyToClipboardBtn = getComponent("CopyToClipboardBtn", true);

  const hasSecurity = security && !!security.count();
  const securityIsOptional = hasSecurity && security.size === 1 && security.first().isEmpty();
  const allowAnonymous = !hasSecurity || securityIsOptional;

  return (
    <div className={`opblock-summary opblock-summary-${method}`}>
      <button
        aria-label={`${method} ${path.replace(/\//g, "\u200b/")}`}
        aria-expanded={isShown}
        className="opblock-summary-control"
        onClick={toggleShown}
      >
        <div>
          <OperationSummaryMethod method={method} />
        </div>
        <div className={"flex flex-col flex-1"}>
          <OperationSummaryPath getComponent={getComponent} operationProps={operationProps} specPath={specPath} />

          {!showSummary ? null : <div className="opblock-summary-description pl-8">{String(resolvedSummary || summary)}</div>}
        </div>

        {displayOperationId && (originalOperationId || operationId) ? (
          <span className="opblock-summary-operation-id">{originalOperationId || operationId}</span>
        ) : null}
      </button>
      <CopyToClipboardBtn textToCopy={`${window.location.href.split("?")[0]}?search=${method.toUpperCase()} ${specPath.get(1)}`} />
      {allowAnonymous ? null : (
        <AuthorizeOperationBtn
          isAuthorized={isAuthorized}
          onClick={() => {
            const applicableDefinitions = authSelectors.definitionsForRequirements(security);
            authActions.showDefinitions(applicableDefinitions);
          }}
        />
      )}
      <JumpToPath path={specPath} />
      {/* TODO: use wrapComponents here, swagger-ui doesn't care about jumpToPath */}
      <Button
        variant={"iconSmall" as any}
        aria-expanded={isShown}
        title={isShown ? "Collapse operation" : "Expand operation"}
        onClick={() => {
          isBookmarked
            ? props.layoutActions.removeFromBookmarks(method + "-" + path)
            : props.layoutActions.addToBookmarks(method + "-" + path);
        }}
        theme={"white"}
        icon={isBookmarked ? "StarFilled" : "StarOutlined"}
        className={"pointer-events-auto me-auto transition-opacity mx-12"}
      />

      <Button
        variant={"iconSmall" as any}
        aria-expanded={isShown}
        title={isShown ? "Collapse operation" : "Expand operation"}
        onClick={toggleShown}
        theme={"white"}
        icon={isShown ? "ArrowDefaultUp" : "ArrowDefaultDown"}
        className={"pointer-events-auto me-auto transition-opacity mx-12"}
      />
    </div>
  );
}
