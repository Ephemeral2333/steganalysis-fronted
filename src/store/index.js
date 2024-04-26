import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    email: null,
  },
  mutations: {
    setToken(state, token, email) {
      state.token = token;
      state.email = email;
    },
    logout(state) {
      state.token = null;
      state.email = null;
    },
  },
});
