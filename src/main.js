import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.config.productionTip = false
require('moment/locale/ru')
Vue.use(VueToast)

Vue.use(Vuelidate)


new Vue({
  router,
  store,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')
