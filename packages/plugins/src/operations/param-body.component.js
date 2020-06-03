import React from 'react'
import { List } from 'immutable'

export function wrapParamBody (BaseParamBody) {
  return class ParamBody extends BaseParamBody {
    componentWillReceiveProps (nextProps) {
      super.componentWillReceiveProps(nextProps)
      let { param } = nextProps

      if (param.get('value') && !this.state.example) {
        this.setState({
          example: param.get('value')
        })
      }
    }

    render () {
      let {
        onChangeConsumes,
        param,
        specSelectors,
        pathMethod,
        getComponent
      } = this.props

      const TextArea = getComponent('TextArea')
      const HighlightCode = getComponent('highlightCode')
      const ContentType = getComponent('contentType')
      // for domains where specSelectors not passed
      let parameter = specSelectors ? specSelectors.parameterWithMetaByIdentity(pathMethod, param) : param
      let errors = parameter.get('errors', List())
      let consumesValue = specSelectors.contentTypeValues(pathMethod).get('requestContentType')
      let consumes = this.props.consumes && this.props.consumes.size ? this.props.consumes : ParamBody.defaultProp.consumes

      let { value, example } = this.state

      return (
        <div className="body-param" data-param-name={param.get('name')} data-param-in={param.get('in')}>
          <div className="flex w-full">
            <div className={'w-1/2'}>
              <TextArea
                className={'body-param__text' + (errors.count() ? ' invalid' : '')} value={value}
                onChange={this.handleOnChange}/>
            </div>
            <div className={'w-1/2 pl-4 pt-1'}>
              {this.state.example ? <HighlightCode
                className="body-param__example"
                value={example}/> : null}
            </div>
          </div>
          <div className="body-param-options">
            <label htmlFor="">
              <span>Parameter content type</span>
              <ContentType
                value={consumesValue} contentTypes={consumes} onChange={onChangeConsumes}
                className="body-param-content-type"/>
            </label>
          </div>
        </div>
      )
    }
  }
}
