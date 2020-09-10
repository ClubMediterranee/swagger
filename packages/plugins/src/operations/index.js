import reducers from './operations.reducers'
import * as actions from './operations.actions'
import * as selectors from './operations.selectors'
import SearchContainer from './search.container'
import Operations from './operations.component'
import OperationSummary from './operation-summary.component'
import TagsContainer from './tags.container'
import { operationsFilter } from './operations.filter'
import { wrapOperationsContainer } from './operations.container'
import { wrapParamBody } from './param-body.component'
import { wrapJsonSchemaArray } from './jsonschema.array.component'
import { wrapJsonSchemaString } from './jsonschema.string.component'
import { wrapJsonSchemaForm } from './jsonschemaform.component'

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
      TagsContainer,
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
      JsonSchema_array: wrapJsonSchemaArray,
      JsonSchema_string: wrapJsonSchemaString,
      JsonSchemaForm: wrapJsonSchemaForm
    },
    fn: {
      operationsFilter
    }
  }
}
