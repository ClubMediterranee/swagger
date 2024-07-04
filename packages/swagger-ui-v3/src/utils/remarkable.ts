import hljs from "highlight.js";
import { Remarkable } from "remarkable";
// @ts-ignore
import { remarkablePluginHeadingId } from "remarkable-plugin-heading-id";

export const parser = new Remarkable("commonmark", {
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<div class="highlight-code">' + hljs.highlight(lang, str).value + "</div>";
      } catch (__) {}
    }

    return str;
  }
});
parser.block.ruler.enable(["table"]);
parser.set({ linkTarget: "_blank" });
parser.use(remarkablePluginHeadingId, {});
