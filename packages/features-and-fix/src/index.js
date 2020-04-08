// eslint-disable
import Vue from 'vue'
import VueToastr from 'vue-toastr'
import Popin from './components/Popins'
import PopinSettings from './components/PopinSettings'
import PopinBuildWithParams from './components/PopinBuildWithParams'
import RollingDate from './components/RollingDate'
import Navbar from './components/Navbar'
import Features from './components/Features'
import App from './App'
import './index.css'

Vue.use(VueToastr)

Vue.component('Popin', Popin)
Vue.component('PopinSettings', PopinSettings)
Vue.component('PopinBuildWithParams', PopinBuildWithParams)
Vue.component('Navbar', Navbar)
Vue.component('RollingDate', RollingDate)
Vue.component('Features', Features)

new Vue(App).$mount('#app')
