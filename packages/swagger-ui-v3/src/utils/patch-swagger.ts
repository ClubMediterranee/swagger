const LABELS: Record<string, { label: string }> = {
  "oidc-gm-quick-login": { label: "Gm quick login" },
  "oidc-gm-full-login": { label: "Gm full login" },
  "oidc-go": { label: "Go login" },
  "oidc-partners": { label: "Gm login" }
};

const trim = (str: string) =>
  str
    .split("\n")
    .map((line: string) => line.trim())
    .join("\n");

// @ts-ignore
export function patchSwagger(spec: any): any {
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

      operation.description = before + operation.description;

      if (operation.externalDocs) {
        operation.description += trim(externalDocs(operation.externalDocs));
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
  return `<div class="bg-white shadow px-5 py-4 -mx-5">
    <h3 class="mt-0">For more details</h3>
    <ul class="pl-4 mb-1">
        <li class="">
            <a href="${externalDocs.url}" target="_blank" rel="noopener">{externalDocs.description}</a>
        </li>
    </ul>
  </div>`;
}

function deprecated(depreciation: any): string {
  return `<div class="border-2 text-red border-red p-5 rounded-small pb-5">
    <div class="font-bold uppercase font-happiness text-md mb-2">Deprecated route</div>
    <div>
        Use <a href="${depreciation.href}">${depreciation.method} ${depreciation.route}}</a> instead.
        This route will be removed on <strong>^{depreciation.removingDate}</strong>.
        <br />See more details on our migration note <a href="https://api.clubmed.com/doc/migration-notes/${depreciation.discussionId}}" target="_blank">here</a>.
    </div>
</div>`;
}
