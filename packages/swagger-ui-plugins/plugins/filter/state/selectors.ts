import { getStorageValue } from "@clubmed/ui/hooks/storage/useLocaleStorage";
import { Map, Set } from "immutable";

import { System } from "../../../interfaces/System";
import { sentenceCase } from "../../../utils/sentence-case";

export const currentAdvancedFilters = (state: Map<string, any>) => {
  return (
    state.get("advancedFilters") ||
    Map<string, any>(
      getStorageValue("swagger_advancedFilters") || {
        deprecated: false,
        admin: false
      }
    )
  );
};

export const tagsChoices =
  (state: any) =>
  ({ specSelectors }: System) => {
    return specSelectors
      .operationsWithTags()
      .sortBy(
        (_: any, key: any) => key, // get the name of the tag to be passed to the sorter
        (tagA: any, tagB: any) => {
          return tagA > tagB ? 1 : tagA < tagB ? -1 : 0;
        }
      )
      .map((_: any, tag: any) => {
        return {
          label: sentenceCase(tag),
          value: tag
        };
      });
  };

export const getBookmarks = (state: Map<string, any>) => {
  return state.get("bookmarks") || Set<string>(getStorageValue("bookmarks") || []);
};
