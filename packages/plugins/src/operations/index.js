import reducers from './operations.reducers'
import * as actions from './operations.actions'
import * as selectors from './operations.selectors'
import SearchContainer from './search.container'
import Operations from './operations.component'
import OperationSummary from './operation-summary.component'
import ToggleContainer from './toggle.container'
import { operationsFilter } from './operations.filter'

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
      operations () {
        return Operations
      },
      OperationSummary () {
        return OperationSummary
      }
    },
    fn: {
      operationsFilter,
      tagsFilter (taggedOps, tagKeyword) {
        const hasHidden = String(window.location.search).includes('tags=hidden')

        return taggedOps.filter((tagObj, tag) => hasHidden ? tag === 'hidden' : tag !== 'hidden')
      }
    }
  }
}
