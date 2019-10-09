// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './_routePermission'
// todo
// cssVars()

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

// takvim
import VueFlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
Vue.use(VueFlatPickr)
import flatpickr from 'flatpickr'
import { Turkish } from 'flatpickr/dist/l10n/tr.js'
flatpickr.localize(Turkish)


/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
});
