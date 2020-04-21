import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import ImPropTypes from 'react-immutable-proptypes'

function valueOrEmptyList (value) {
  return List.isList(value) ? value : List()
}

const noop = () => {
}
const JsonSchemaPropShape = {
  getComponent: PropTypes.func.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  keyName: PropTypes.any,
  fn: PropTypes.object.isRequired,
  schema: PropTypes.object,
  errors: ImPropTypes.list,
  required: PropTypes.bool,
  dispatchInitialValue: PropTypes.bool,
  description: PropTypes.any,
  disabled: PropTypes.bool
}

const JsonSchemaDefaultProps = {
  value: '',
  onChange: noop,
  schema: {},
  keyName: '',
  required: false,
  errors: List()
}

export class JsonSchema_array extends PureComponent {
  static propTypes = JsonSchemaPropShape
  static defaultProps = JsonSchemaDefaultProps

  constructor (props, context) {
    super(props, context)
    this.state = { value: valueOrEmptyList(props.value) }
  }

  componentWillReceiveProps (props) {
    if (props.value !== this.state.value) {
      this.setState({ value: props.value })
    }
  }

  onChange = () => this.props.onChange(this.state.value)

  onItemChange = (itemVal, i) => {
    this.setState(state => ({
      value: state.value.set(i, itemVal)
    }), this.onChange)
  }

  removeItem = (i) => {
    this.setState(state => ({
      value: state.value.remove(i)
    }), this.onChange)
  }

  addItem = () => {
    this.setState(state => {
      state.value = valueOrEmptyList(state.value)
      return {
        value: state.value.push('')
      }
    }, this.onChange)
  }

  onEnumChange = (value) => {
    this.setState(() => ({
      value: value
    }), this.onChange)
  }

  render () {
    let { getComponent, required, schema, errors, fn, disabled } = this.props

    errors = errors.toJS ? errors.toJS() : []

    let itemSchema = fn.inferSchema(schema.items)

    const JsonSchemaForm = getComponent('JsonSchemaForm')
    const Button = getComponent('Button')

    let enumValue = itemSchema['enum']
    let value = this.state.value

    if (enumValue) {
      const Select = getComponent('Select')
      return (<Select
        className={errors.length ? 'invalid' : ''}
        title={errors.length ? errors : ''}
        multiple={true}
        value={value}
        disabled={disabled}
        allowedValues={enumValue}
        allowEmptyValue={!required}
        onChange={this.onEnumChange}/>)
    }

    return (
      <div className="json-schema-array">
        {!value || !value.count || value.count() < 1 ? null
          : value.map((item, i) => {
            let schema = Object.assign({}, itemSchema)
            if (errors.length) {
              let err = errors.filter((err) => err.index === i)
              if (err.length) errors = [err[0].error + i]
            }
            return (
              <div key={i} className="json-schema-form-item">
                <JsonSchemaForm
                  fn={fn}
                  getComponent={getComponent}
                  value={item}
                  onChange={(val) => this.onItemChange(val, i)}
                  schema={schema}
                  disabled={disabled}
                />
                {!disabled ? (
                  <Button
                    className="btn btn-sm json-schema-form-item-remove"
                    onClick={() => this.removeItem(i)}
                  > - </Button>
                ) : null}
              </div>
            )
          }).toArray()
        }
        {!disabled ? (
          <Button
            className={`btn btn-sm json-schema-form-item-add ${errors.length ? 'invalid' : null}`}
            onClick={this.addItem}
          >
            Add item
          </Button>
        ) : null}
      </div>
    )
  }
}

export function wrapJsonSchemaArray (BaseJsonSchemaArray) {
  return class JsonSchemaArray extends BaseJsonSchemaArray {
    onItemChange = (itemVal, i) => {
      this.onChange(this.state.value.set(i, itemVal))
    }

    removeItem = (i) => {
      this.onChange(this.state.value.remove(i))
    }

    addItem = () => {
      this.onChange(valueOrEmptyList(this.state.value).value.push(''))
    }

    onChange = (value) => {
      this.setState({ value })
      this.props.onChange(value)
    }

    render () {
      let { getComponent, required, schema, errors, fn, disabled } = this.props

      if (schema.enum && schema.items) {
        schema = {
          ...schema,
          items: {
            ...schema.items,
            enum: schema.enum
          }
        }
        schema.items.enum = schema.enum
      }

      errors = errors.toJS ? errors.toJS() : []

      let itemSchema = fn.inferSchema(schema.items)

      let enumValue = itemSchema['enum']
      let value = this.state.value

      if (enumValue) {
        const Select = getComponent('Select')
        return (<Select
          className={errors.length ? 'invalid' : ''}
          title={errors.length ? errors : ''}
          multiple={true}
          value={value}
          disabled={disabled}
          allowedValues={enumValue}
          allowEmptyValue={!required}
          onChange={this.onChange}/>)
      }
      return super.render()
    }
  }
}
