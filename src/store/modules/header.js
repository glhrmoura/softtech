import { vuexStore } from '@/utils/vuex';

export default vuexStore({
  state: {
    filterVisibility: false,
  },

  getters: {
    filterVisibility: (state) => {
      return state.filterVisibility;
    },
  },

  mutations: {
    SET_FILTER: (state, newFilterVisibility) => {
      state.filterVisibility = newFilterVisibility;
    },

    TOGGLE_FILTER: (state) => {
      state.filterVisibility = !state.filterVisibility;
    },
  },
});
