import React, { Suspense } from 'react'
import { wrapJsonSchemaArray } from './jsonschema.array.component'
import { wrapJsonSchemaString } from './jsonschema.string.component'
import { wrapJsonSchemaForm } from './jsonschemaform.component'
import OperationSummary from './operation-summary.component'
import * as actions from './operations.actions'
import Operations from './operations.component'
import { wrapOperationsContainer } from './operations.container'
import { operationsFilter } from './operations.filter'
import reducers, { LOCALE_STORAGE_BOOKMARK_KEY } from './operations.reducers'
import { wrapParamBody } from './param-body.component'
import SearchContainer from './search.container'
import TagsContainer from './tags.container'
import { Set } from 'immutable'
import { getKey } from '../common/localeStorage'
import wrapOperationTag from './operationTag.component'

const JsonEditorComponent = React.lazy(() => import(/* webpackChunkName: "json-editor" */'./json-editor.component'))

function getTagsState (system) {
  return (system.getConfigs().tagsSwitches || []).reduce((obj, item) => {
    return {
      ...obj,
      [item.value]: false
    }
  }, {})
}

function getBookmarksState (state) {
  return state.get('bookmarks') || Set(getKey(LOCALE_STORAGE_BOOKMARK_KEY))
}

export const OperationsPlugin = (system) => {
  return {
    statePlugins: {
      operations: {
        reducers,
        actions,
        selectors: {
          currentFilter: state => state.get('filter'),
          currentTagsFilter: state => state.get('tagsFilter') || getTagsState(system),
          isBookmarked: (state, path, method) => getBookmarksState(state)
            .includes(`${path}-${method}`)
        }
      }
    },
    components: {
      SearchContainer,
      TagsContainer,
      TryItOutButton: () => null,
      TextArea: (props) =>
        <Suspense fallback={<div className={'text-sm color-blue'}>Loading...</div>}>
          <JsonEditorComponent {...props}/>
        </Suspense>
    },
    wrapComponents: {
      operations () {
        return Operations
      },
      OperationTag: wrapOperationTag,
      OperationSummary () {
        return OperationSummary
      },
      OperationContainer: wrapOperationsContainer,
      ParamBody: wrapParamBody,
      JsonSchemaForm: wrapJsonSchemaForm,
      JsonSchema_array: wrapJsonSchemaArray,
      JsonSchema_string: wrapJsonSchemaString
    },
    fn: {
      operationsFilter
    }
  }
}
