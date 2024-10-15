import classnames from "classnames";
import React from "react";

function Operation({ method }: { method: string }) {
  return (
    <div className={classnames("opblock loaded transition-opacity duration-200 ease-in-out", `opblock-${method.toLowerCase()}`)}>
      <div className={`opblock-summary opblock-summary-${method.toLowerCase()}`}>
        <span className="opblock-summary-method">{method}</span>
        <div className="flex flex-col flex-1">
          <span className="opblock-summary-path">
            <span>
              &nbsp;
              <wbr />
              &nbsp;
            </span>
          </span>
          <div className="opblock-summary-description pl-8 text-operation">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

export function OperationsLoading() {
  return (
    <section className="block col-12 block-desktop col-12-desktop">
      <div>
        <div className="operation-loading opblock-tag-section is-open">
          <h3 className="opblock-tag no-desc">
            <span className="text-operation max-w-[300px]">&nbsp;</span>
          </h3>
          <div className="no-margin"></div>
          <div className="operation-tag-content">
            <Operation method={"GET"} />
            <Operation method={"POST"} />
          </div>

          <h3 className="opblock-tag no-desc">
            <span className="text-operation max-w-[300px]">&nbsp;</span>
          </h3>
          <div className="no-margin"></div>
          <div className="operation-tag-content">
            <Operation method={"PUT"} />
            <Operation method={"PATCH"} />
            <Operation method={"DELETE"} />
          </div>
        </div>
      </div>
    </section>
  );
}
