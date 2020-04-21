import reducers from './operations.reducers'
import * as actions from './operations.actions'
import * as selectors from './operations.selectors'
import SearchContainer from './search.container'
import Operations from './operations.component'
import OperationSummary from './operation-summary.component'
import ToggleContainer from './toggle.container'
import { operationsFilter } from './operations.filter'
import { wrapOperationsContainer } from './operations.container'
import { wrapParamBody } from './param-body.component'
import { wrapJsonSchemaArray } from './jsonschema.array.component'

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
      ToggleContainer,
      TryItOutButton: () => null
    },
    wrapComponents: {
      operations () {
        return Operations
      },
      OperationSummary () {
        return OperationSummary
      },
      OperationContainer: wrapOperationsContainer,
      ParamBody: wrapParamBody,
      JsonSchema_array: wrapJsonSchemaArray
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
