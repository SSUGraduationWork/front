// store.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import userStore from '@/store/modules/userStore.js';
import registerStore from '@/store/modules/registerStore';

export default createStore({
  state: {
    redirectURL: null,
  },
  mutations: {
    setRedirectURL(state, url){
        state.redirectURL = url;
    },
  },
  modules: {
    userStore: userStore,
    registerStore: registerStore,
  },
  plugins: [
    createPersistedState({
        paths: ["userStore", "redirectURL"]
    })
  ]
});
