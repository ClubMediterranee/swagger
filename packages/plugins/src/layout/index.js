import StandaloneLayout from './standalone-layout.component'
import ModelsView from './models.view'
import OperationsView from './operations.view'

export const StandaloneLayoutPlugin = () => {
  return {
    components: {
      StandaloneLayout,
      ModelsView,
      OperationsView
    }
  }
}
