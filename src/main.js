import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ToastPlugin } from 'bootstrap-vue'
import {VueReCaptcha} from 'vue-recaptcha-v3'
import VueMeta from 'vue-meta';
import vuetwemoji from 'vue-twemoji'

Vue.config.productionTip = false;


Vue.use(BootstrapVue)
Vue.use(IconsPlugin);
Vue.use(ToastPlugin);
Vue.use(VueAxios, axios);
Vue.use(VueReCaptcha, {siteKey: '6LeOJ6cZAAAAAPlDWXxpvyzSrVU4Xep9LzN7vwKy'});
Vue.use(VueMeta);
Vue.use(vuetwemoji, {
  extension: 'svg',
  size: '36x36'
});

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
