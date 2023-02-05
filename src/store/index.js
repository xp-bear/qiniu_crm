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
    // 增加香蕉
    insertB(state) {
      state.userObjStore ? state.userObjStore.banana_num++ : "";
    },
    // 修改用户信息
    updateUserInfo(state, obj) {
      state.userObjStore ? (state.userObjStore.avatar = obj.avatar) : "";
      state.userObjStore ? (state.userObjStore.username = obj.username) : "";
      state.userObjStore ? (state.userObjStore.sign = obj.sign) : "";
    },
  },
  actions: {},
  modules: {},
});
