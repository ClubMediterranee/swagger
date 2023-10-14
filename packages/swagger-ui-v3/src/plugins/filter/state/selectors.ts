import {getStorageValue} from "@clubmed/ui/hooks/storage/useLocaleStorage";
import {System} from "../../../interfaces/System";
import {sentenceCase} from "../../../utils/sentence-case";
import {Map} from "immutable";

export const currentAdvancedFilters = (state: Map<string, any>) => {
  return state.get("advancedFilters") || Map<string, any>(getStorageValue("swagger_advancedFilters") || {
    deprecated: false,
    admin: false
  });
}

export const tagsChoices = (state: any) => ({getConfigs, specSelectors}: System) => {
  return specSelectors.operationsWithTags(state)
    .sortBy(
      (val: any, key: any) => key, // get the name of the tag to be passed to the sorter
      (tagA: any, tagB: any) => {
        return tagA > tagB ? 1 : tagA < tagB ? -1 : 0;
      }
    )
    .map((ops: any, tag: any) => {
      return {
        label: sentenceCase(tag),
        value: tag
      };
    });
};


