import { AdvancedFilterPanel } from "../filter/advanced-filter-panel.component";
import FilterContainer from "../filter/filter.container";
import { opsAdvancedFilter, opsFilter } from "../filter/ops-filter";
import * as actions from "../filter/state/actions";
import reducers from "../filter/state/reducers";
import * as selectors from "../filter/state/selectors";
import * as wrapSelectors from "../filter/state/wrap-selectors";
import Topbar from "./topbar.component";

export const TopbarPlugin = () => ({
  components: {
    Topbar,
    AdvancedFilterPanel,
    FilterContainer
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
