import { wrapJsonSchemaArray } from './jsonschema.array.component'
import { wrapJsonSchemaString } from './jsonschema.string.component'
import { wrapJsonSchemaForm } from './jsonschemaform.component'
import OperationSummary from './operation-summary.component'
import * as actions from './operations.actions'
import Operations from './operations.component'
import { wrapOperationsContainer } from './operations.container'
import { operationsFilter } from './operations.filter'
import reducers from './operations.reducers'
import { wrapParamBody } from './param-body.component'
import SearchContainer from './search.container'
import TagsContainer from './tags.container'

function getTagsState (system) {
  return (system.getConfigs().tagsSwitches || []).reduce((obj, item) => {
    return {
      ...obj,
      [item.value]: false
    }
  }, {})
}

export const OperationsPlugin = (system) => {
  return {
    statePlugins: {
      operations: {
        reducers,
        actions,
        selectors: {
          currentFilter: state => state.get('filter'),
          currentTagsFilter: state => state.get('tagsFilter') || getTagsState(system)
        }
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
