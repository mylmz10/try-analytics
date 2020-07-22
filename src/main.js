import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Table from "./components/Table";

Vue.config.productionTip = false;

Vue.component("Table", Table);
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
