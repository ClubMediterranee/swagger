import reducers from './operations.reducers'
import * as actions from './operations.actions'
import * as selectors from './operations.selectors'
import SearchContainer from './search.container'
import ToggleContainer from './toggle.container'
import Operations from './operations.component'

export const OperationsPlugin = () => {
  return {
    statePlugins: {
      operations: {
        reducers,
        actions,
        selectors
      }
    },
    components: {
      SearchContainer,
      ToggleContainer
    },
    wrapComponents: {
      operations: () => {
        return Operations
      }
    },
    fn: {
      operationsFilter (operations, keyword) {
        return operations.filter(item => item.get('path').indexOf(keyword.toLowerCase()) > -1)
      }
    }
  }
}
