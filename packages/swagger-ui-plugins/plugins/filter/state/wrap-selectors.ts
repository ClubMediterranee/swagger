import { List, Map, OrderedMap } from "immutable";

import { System } from "../../../interfaces/System";

export const taggedOperations =
  (oriSelector: any, system: System) =>
  (state: any, ...args: any[]) => {
    let taggedOps = oriSelector(state, ...args);

    const { fn, layoutSelectors, getConfigs } = system.getSystem();
    const configs = getConfigs();
    const { maxDisplayedTags } = configs;
    let advancedFilters = layoutSelectors.currentAdvancedFilters();

    taggedOps = fn.opsAdvancedFilter(taggedOps, advancedFilters);

    // Filter, if requested
    let filter = layoutSelectors.currentFilter();

    if (filter) {
      if (filter !== true && filter !== "true" && filter !== "false") {
        taggedOps = fn.opsFilter(taggedOps, filter);
      }
    }
    // Limit to [max] items, if specified
    if (maxDisplayedTags && !isNaN(maxDisplayedTags) && maxDisplayedTags >= 0) {
      taggedOps = taggedOps.slice(0, maxDisplayedTags);
    }

    let bookmarks = layoutSelectors.getBookmarks();

    if (bookmarks.size > 0) {
      let operations = List();

      taggedOps = taggedOps.map((tagObj: any) => {
        const filteredOps = tagObj.get("operations").filter((operation: any) => {
          if (bookmarks.has(`${operation.get("method")}-${operation.get("path")}`)) {
            operations = operations.push(operation);
            return false;
          }

          return true;
        });

        return tagObj.set("operations", filteredOps);
      });

      taggedOps = OrderedMap({
        bookmarks: Map().set("operations", operations)
      }).merge(taggedOps);
    }

    return taggedOps;
  };
