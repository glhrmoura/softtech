import { storeScaffold } from '@/utils/stores';

export default storeScaffold({
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
