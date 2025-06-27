import moment from "moment";

const LABELS: Record<string, { label: string }> = {
  "oidc-gm-quick-login": { label: "Gm quick login" },
  "oidc-gm-full-login": { label: "Gm full login" },
  "oidc-go": { label: "Go login" },
  "oidc-partners": { label: "Partners login" }
};

const trim = (str: string) =>
  str
    .split("\n")
    .map((line: string) => line.trim())
    .join("\n");

// @ts-ignore
export function patchSwagger(spec: any): any {
  // Fixing the type of arrival_date parameter in suggestions endpoint
  // TODO remove this when the backend is fixed
  spec.paths["/v0/products/{product_id}/suggestions"]?.["get"]?.parameters?.forEach((param: any) => {
    if (param.name === "arrival_date") {
      delete param.type;
      param.schema.type = "string";
    }
  });

  Object.values(spec.paths).forEach((methods: any) => {
    Object.values(methods).forEach((operation: any) => {
      operation.description = operation.description || "";
      let before = "";

      if (operation["x-tags"]) {
        before = trim(xTags(operation["x-tags"]));
      }

      if (operation["x-deprecated"]) {
        before += trim(deprecated(operation["x-deprecated"]));
      }

      if (before) {
        operation.description = (before + "\n\n" + operation.description).trim();
      }

      if (operation.externalDocs) {
        operation.description += "\n\n" + trim(externalDocs(operation.externalDocs));
        operation.externalDocs = undefined;
      }
    });
  });

  return spec;
}

function xTags(xTags: string[]) {
  const items = xTags
    .map(
      (tag: string) =>
        `<div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white last:mr-0 mr-1">${LABELS[tag]?.label || tag}</div>`
    )
    .join("");

  return `<div class="doc-tags flex mt-3">${items}</div>`;
}

function externalDocs(externalDocs: { url: string; description: string }): string {
  return `<div class="bg-white p-8 mt-8 rounded-8">
    <h4 class="font-serif">For more details</h4>
    <ul class="pl-4 mb-1">
        <li class="">
            <a href="${externalDocs.url}" target="_blank" rel="noopener" class="underline">${externalDocs.description}</a>
        </li>
    </ul>
  </div>`;
}

function deprecated(depreciation: any): string {
  if (!depreciation.route) {
    return `<div class="bg-white p-8 mt-8 rounded-8 border-2 text-red border-red">
    <h4 class="font-bold uppercase text-md mb-2">Deprecated route</h4>
    <div>
        This route will be removed on <strong>${depreciation.removingDate}</strong>.
    </div>
</div>`;
  }

  return `<div class="bg-white p-8 mt-8 rounded-8 border-2 text-red border-red">
    <h4 class="font-bold uppercase text-md mb-2">Deprecated route</h4>
    <div>
        Use <a href="${depreciation.href}">${depreciation.method} ${depreciation.route}</a> instead.
        This route will be removed on <strong>${moment(depreciation.date).format("DD/MM/YYYY")}</strong>.
        <br />See more details on our migration note <a href="https://api.clubmed.com/doc/migration-notes/${depreciation.discussionId}" target="_blank">here</a>.
    </div>
</div>`;
}
