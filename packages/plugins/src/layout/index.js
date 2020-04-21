import StandaloneLayout from './standalone-layout.component'
import ModelsView from './models.view'
import OperationsView from './operations.view'
import { Select } from './select.component'

export const StandaloneLayoutPlugin = () => {
  return {
    components: {
      StandaloneLayout,
      ModelsView,
      OperationsView,
      Select
    }
  }
}
