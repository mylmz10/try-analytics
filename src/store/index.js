import Vue from "vue";
import Vuex from "vuex";

const API_URL = process.env.VUE_APP_API_URL;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    //eslint-disable-next-line
    request({}, { url, method = "GET", body, authorizationToken, json = true }) {
      if (!url) {
        return Promise.reject(new Error("Url is undefined"));
      }
      let options = {
        headers: {
          "Content-Type": "application/json",
          ...authorizationToken,
        },
      };
      switch (method) {
        case "PUT":
        case "POST":
          options = {
            ...options,
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(body),
          };
          break;
        case "DELETE":
          break;
        case "GET":
        default:
          method = "GET";
          break;
      }
      options.method = method;

      if (json) {
        return fetch(url, options).then(res => res.json());
      }
      return fetch(url, options).then(res => res.text());
    },
    getResult({ dispatch }, { siteUrl }) {
      return dispatch("request", {
        url: `${API_URL}/api/getResult?token="token1"&url=${siteUrl}`,
      });
    },
  },
  modules: {},
});
