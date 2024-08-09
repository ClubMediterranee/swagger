import { AdvancedFilterPanel } from "./advanced-filter-panel.component";
import { opsAdvancedFilter, opsFilter } from "./ops-filter";
import * as actions from "./state/actions";
import reducers from "./state/reducers";
import * as selectors from "./state/selectors";
import * as wrapSelectors from "./state/wrap-selectors";

export const FiltersPlugin = () => ({
  components: {
    AdvancedFilterPanel
  },
  statePlugins: {
    layout: {
      reducers,
      actions,
      selectors
    },
    spec: {
      wrapSelectors
    }
  },
  fn: {
    opsFilter,
    opsAdvancedFilter
  }
});
