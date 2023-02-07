import { vuexStore } from '@/utils/vuex';

import team from '@/assets/data/team.json';

export default vuexStore({
  actions: {
    fetchTeamMember: async (_, payload) => {
      try {
        const { username } = payload;

        return team.find((teamMember) => teamMember.username === username);
      } catch (err) {
        return err;
      }
    },

    fetchTeam: async () => {
      try {
        return team;
      } catch (err) {
        return err;
      }
    },
  },
});
