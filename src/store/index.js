// store.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import userStore from '@/store/modules/userStore.js';
import registerStore from '@/store/modules/registerStore';

export default createStore({
  modules: {
    userStore: userStore,
    registerStore: registerStore,
  },
  plugins: [
    createPersistedState({
        paths: ["userStore"]
    })
  ]
});
