import { vuexStore } from '@/utils/vuex';

export default vuexStore({
  state: {
    isMobile: false,
    isDesktop: false,
  },

  getters: {
    isMobile: (state) => {
      return state.isMobile;
    },

    isDesktop: (state) => {
      return state.isDesktop;
    }
  },

  mutations: {
    calc: (state, payload) => {
      state.isMobile = payload.width <= 768;
      state.isDesktop = payload.width >= 769;
    },
  },

  mounted: (context) => {
    const compute = (container) => {
      context.commit('calc', {
        width: container.innerWidth,
        heigth: container.innerHeight,
      });
    };

    compute(window);

    window.addEventListener('resize', () => compute(window));
  },
});
