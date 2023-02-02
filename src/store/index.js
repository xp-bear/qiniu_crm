import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userObjStore: "", //登录用户的信息
  },
  getters: {},
  mutations: {
    getUser(state, data) {
      state.userObjStore = data;
    },
  },
  actions: {},
  modules: {},
});
