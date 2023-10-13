import type {Iterable, Map} from "immutable";
import StandaloneLayout from "./custom-standalone-layout.component";
import BaseLayout from "./base-layout.component";
import AuthorizeBtn from "../auth/authorize-btn.component";
import FilterContainer from "../filter/filter.container";
import OperationTag from "../operations/operation-tag.component";
import {opsFilter} from "../filter/ops-filter";
import {System} from "../../interfaces/System";

export const StandaloneLayoutPlugin = (system: System) => {
  return {
    components: {
      StandaloneLayout,
      BaseLayout,
      authorizeBtn: AuthorizeBtn,
      FilterContainer,
      OperationTag
    },
    fn: {
      opsFilter(taggedOps: Iterable<string, Map<string, any>>, phrase: string) {
        return opsFilter(taggedOps, phrase, system);
      }
    }
  };
};
