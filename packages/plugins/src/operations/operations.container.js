export function wrapOperationsContainer (BaseOperationsContainer) {
  return class OperationContainer extends BaseOperationsContainer {
    constructor (props, context) {
      super(props, context)
      this.state = {
        tryItOutEnabled: true,
        executeInProgress: false
      }
    }
  }
}
