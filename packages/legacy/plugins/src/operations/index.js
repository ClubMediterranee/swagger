import React, { Suspense } from 'react'
import { wrapJsonSchemaArray } from './jsonschema.array.component'
import { wrapJsonSchemaString } from './jsonschema.string.component'
import { wrapJsonSchemaForm } from './jsonschemaform.component'
import { wrapOperationSummary } from './operation-summary.component'
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
import { updateAllFields } from '../common/updateAllFields'

const UPDATE_REQUEST_FIELDS = 'update_request_fields'

const JsonEditorComponent = React.lazy(() => import(/* webpackChunkName: "json-editor" */'./json-editor.component'))

function getTagsState (system) {
  return (system.getConfigs().tagsSwitches || []).reduce((obj, item) => {
    return {
      ...obj,
      [item.value]: !!item.checked
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
      },
      spec: {
        actions: {
          updateApiKeyFields: (payload) => {
            return {
              type: UPDATE_REQUEST_FIELDS,
              fieldName: 'api_key',
              fieldType: 'query',
              payload
            }
          },
          updatePathFields: (fieldName, payload) => {
            return {
              type: UPDATE_REQUEST_FIELDS,
              fieldName,
              fieldType: 'path',
              payload
            }
          }
        },
        reducers: {
          [UPDATE_REQUEST_FIELDS]: (state, action) => {
            return updateAllFields(state, action.fieldType, action.fieldName, action.payload)
          }
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
      OperationSummary: wrapOperationSummary,
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
