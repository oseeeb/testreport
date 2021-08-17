// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from "./store";
import { BootstrapVue,IconsPlugin  } from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import jquery from 'vue-jquery'


Vue.use(jquery)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// router setup
import routes from "./routes/routes";

// MaterialDashboard plugin
import MaterialDashboard from "./dashboard";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.use(VueRouter);
Vue.use(MaterialDashboard);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
