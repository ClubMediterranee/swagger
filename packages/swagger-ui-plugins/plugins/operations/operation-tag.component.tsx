import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import Im from "immutable";
import isFunc from "lodash/isFunction";
import { PropsWithChildren } from "react";

import { System } from "../../interfaces/System";
import { sentenceCase } from "../../utils/sentence-case";
import { createDeepLinkPath, escapeDeepLinkPath, safeBuildUrl, sanitizeUrl } from "../../utils/url";

export default function OperationTag(props: PropsWithChildren<System & { tag: string; tagObj: any }>) {
  const {
    tagObj = Im.fromJS({}),
    tag = "",
    children,
    oas3Selectors,
    layoutSelectors,
    layoutActions,
    getConfigs,
    getComponent,
    specUrl
  } = props;

  let { docExpansion, deepLinking } = getConfigs();
  const isDeepLinkingEnabled = deepLinking && (deepLinking as any) !== false;

  const Collapse = getComponent("Collapse");
  const Markdown = getComponent("Markdown", true);
  const DeepLink = getComponent("DeepLink");
  const Link = getComponent("Link");

  let tagDescription = tagObj.getIn(["tagDetails", "description"], null);
  let tagExternalDocsDescription = tagObj.getIn(["tagDetails", "externalDocs", "description"]);
  let rawTagExternalDocsUrl = tagObj.getIn(["tagDetails", "externalDocs", "url"]);
  let tagExternalDocsUrl;

  if (isFunc(oas3Selectors) && isFunc(oas3Selectors.selectedServer)) {
    tagExternalDocsUrl = safeBuildUrl(rawTagExternalDocsUrl, specUrl, { selectedServer: oas3Selectors.selectedServer() });
  } else {
    tagExternalDocsUrl = rawTagExternalDocsUrl;
  }

  let isShownKey = ["operations-tag", tag];
  let showTag = layoutSelectors.isShown(isShownKey, docExpansion === "full" || docExpansion === "list");

  return (
    <div className={showTag ? "opblock-tag-section is-open" : "opblock-tag-section"}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <h3
        onClick={() => layoutActions.show(isShownKey, !showTag)}
        className={!tagDescription ? "opblock-tag no-desc" : "opblock-tag"}
        id={isShownKey.map((v) => escapeDeepLinkPath(v)).join("-")}
        data-tag={tag}
        data-is-open={showTag}
      >
        <DeepLink enabled={isDeepLinkingEnabled} isShown={showTag} path={createDeepLinkPath(tag)} text={sentenceCase(tag)} />
        {!tagDescription ? (
          <small></small>
        ) : (
          <small>
            <Markdown source={tagDescription} />
          </small>
        )}

        {!tagExternalDocsUrl ? null : (
          <div className="info__externaldocs">
            <small>
              <Link href={sanitizeUrl(tagExternalDocsUrl)} onClick={(e: MouseEvent) => e.stopPropagation()} target="_blank">
                {tagExternalDocsDescription || tagExternalDocsUrl}
              </Link>
            </small>
          </div>
        )}

        <Button
          variant={"icon"}
          aria-expanded={showTag}
          title={showTag ? "Collapse operation" : "Expand operation"}
          onClick={() => layoutActions.show(isShownKey, !showTag)}
          theme={"white"}
          icon={showTag ? "ArrowDefaultUp" : "ArrowDefaultDown"}
          className={"pointer-events-auto me-auto transition-opacity"}
          label={showTag ? "Collapse operation" : "Expand operation"}
        />
      </h3>

      <Collapse isOpened={showTag}>{children}</Collapse>
    </div>
  );
}
