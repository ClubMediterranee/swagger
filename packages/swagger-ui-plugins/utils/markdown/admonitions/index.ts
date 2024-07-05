/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Parent } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import type { Plugin, Processor, Transformer } from "unified";

import { KEYWORDS } from "./constants";

export type AdmonitionOptions = {
  keywords: string[];
  extendDefaults: boolean;
};

export const DefaultAdmonitionOptions: AdmonitionOptions = {
  keywords: ["secondary", "info", "success", "danger", "note", "tip", "warning", "important", "caution"],
  extendDefaults: true
};

export function normalizeAdmonitionOptions(providedOptions: Partial<AdmonitionOptions> | true): AdmonitionOptions {
  if (providedOptions === true) {
    return DefaultAdmonitionOptions;
  }

  const options = { ...DefaultAdmonitionOptions, ...providedOptions };

  // By default it makes more sense to append keywords to the default ones
  // Adding custom keywords is more common than disabling existing ones
  if (options.extendDefaults) {
    options.keywords = [...DefaultAdmonitionOptions.keywords, ...options.keywords];
  }

  return options;
}

type DirectiveLabel = Parent;
type DirectiveContent = ContainerDirective["children"];

function parseDirective(directive: ContainerDirective): {
  directiveLabel: DirectiveLabel | undefined;
  contentNodes: DirectiveContent;
} {
  const hasDirectiveLabel =
    // @ts-expect-error: fine
    directive.children?.[0]?.data?.directiveLabel === true;
  if (hasDirectiveLabel) {
    const [directiveLabel, ...contentNodes] = directive.children;
    return { directiveLabel: directiveLabel as DirectiveLabel, contentNodes };
  }
  return { directiveLabel: undefined, contentNodes: directive.children };
}

function getTextOnlyTitle(directiveLabel: DirectiveLabel): string | undefined {
  const isTextOnlyTitle = directiveLabel?.children?.length === 1 && directiveLabel?.children?.[0]?.type === "text";
  return isTextOnlyTitle
    ? // @ts-expect-error: todo type
      (directiveLabel?.children?.[0].value as string)
    : undefined;
}

const plugin: Plugin = function plugin(this: Processor, optionsInput: Partial<AdmonitionOptions> = {}): Transformer {
  return async (root) => {
    const { visit } = await import("unist-util-visit");

    visit(root, (node) => {
      if (node.type === "containerDirective") {
        const directive = node as ContainerDirective;
        const isAdmonition = KEYWORDS.includes(directive.name);

        if (!isAdmonition) {
          return;
        }

        const { directiveLabel, contentNodes } = parseDirective(directive);

        const textOnlyTitle = directive.attributes?.title ?? (directiveLabel ? getTextOnlyTitle(directiveLabel) : undefined);

        directive.data = {
          hName: "div",
          hProperties: {
            className: directive.name + " custom-block"
          }
        };

        directive.children = [
          {
            type: "containerDirective",
            data: {
              hName: "p",
              hProperties: {
                className: "custom-block-title"
              }
            },
            children: [
              {
                type: "text",
                value: textOnlyTitle ?? directive.name.toUpperCase()
              }
            ]
          } as never,
          ...contentNodes
        ].filter(Boolean);
      }
    });
  };
};

export default plugin;
