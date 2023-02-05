import { withType } from '@/utils/users';
import { storeScaffold } from '@/utils/stores';

import users from '@/assets/data/users.json';

export default storeScaffold({
  actions: {
    fetchUser: async (_, payload) => {
      try {
        const { username } = payload;

        return users.find(user => user.username === username);
      } catch (err) {
        return err;
      }
    },

    fetchUsers: async () => {
      try {
        return withType(users);
      } catch (err) {
        return err;
      }
    },
  },
});
