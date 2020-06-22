import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ToastPlugin } from 'bootstrap-vue'
import {VueReCaptcha} from 'vue-recaptcha-v3'
import AllIcon from 'vue-ionicons/dist/ionicons'

Vue.config.productionTip = false



Vue.use(AllIcon)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToastPlugin)
Vue.use(VueAxios, axios)
Vue.use(VueReCaptcha, {siteKey: '6LeOJ6cZAAAAAPlDWXxpvyzSrVU4Xep9LzN7vwKy'})


require('vue-ionicons/ionicons.css')
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
