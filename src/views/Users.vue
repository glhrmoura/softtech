<template>
  <div class="users-page container">
    <UserFilter
      :filters="filters"
      @input="onFilter"
    />

    <Loading
      v-if="loading"
      :active="true"
      :is-full-page="false"
    />

    <section v-else-if="usersFiltered.length" class="users-page__cards">
      <UserCard
        :user="user"
        :key="user.email"
        v-for="user in usersPaginated"
      />
    </section>

    <div v-else class="users-page__empty-result">
      <p>No users found</p>
    </div>

    <div v-if="!loading && pageCount" class="users-page__pagination">
      <pagination
        v-model="selected"
        prev-text="Voltar"
        next-text="Avançar"
        container-class="pagination"
        :click-handler="onPaginate"
        :page-count="pageCount"
        :per-page="pagination.perPage"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { byTypes, byAge, byName, byGender } from '@/utils/users';

import UserCard from '@/components/UserCard';
import UserFilter from '@/components/UserFilter';

import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Users',

  components: {
    UserCard,
    Pagination,
    UserFilter,
  },

  data () {
    return {
      selected: 1,

      loading: false,

      users: [],

      filters: {
        age: 100,
        name: '',
        types: [],
        genders: [],
      },

      pagination: {
        skip: 0,
        perPage: 9,
      }
    };
  },

  async mounted() {
    try {
      this.loading = true;

      this.users = await this.$store.dispatch('users/fetchUsers');
    } finally {
      this.loading = false;
    }
  },

  methods: {
    onFilter() {
      this.selected = 1;
      this.pagination.skip = 0;
    },

    goPageTop() {
      const selector = this.isMobile ? '.platform-inner' : 'html';

      document
        .querySelector(selector)
        .scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },

    onPaginate(currentPage) {
      this.pagination.skip = (currentPage - 1) * this.pagination.perPage;
      this.goPageTop();
    }
  },

  computed: {
    ...mapGetters({
      isMobile: 'device/isMobile',
    }),

    pageCount(){
      return Math.floor(this.countFiltered / this.pagination.perPage);
    },

    countFiltered() {
      return this.usersFiltered.length;
    },

    usersPaginated() {
      const { pagination = {} } = this;

      const paginate = !pagination.skip
        ? [0, pagination.perPage]
        : [ pagination.skip, pagination.skip + pagination.perPage ];

      return this.usersFiltered.slice(...paginate);
    },

    usersFiltered() {
      const { filters = {} } = this;

      return this.users
        .filter(byTypes(filters.types))
        .filter(byGender(filters.genders))
        .filter(byName(filters.name))
        .filter(byAge(filters.age));
    },
  },

  beforeDestroy() {
    this.$store.commit('header/SET_FILTER', false);
  },
};
</script>

<style lang="scss" scoped>
.users-page {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 12px;
  padding-left: 250px;
  min-height: 100%;
  grid-template-areas:
    'cards'
    'pagination';

  @include media-queries((
    phone: (
      padding: 0px,
    )
  ))
}

.users-page__empty-result {
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 100;

  @include media-queries((
    phone: (
      font-size: 18px,
    ),
    tablet: (
      font-size: 20px,
    ),
  ))
}

.users-page__loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.users-page__cards {
  display: grid;
  grid-gap: 12px;
  padding: 12px;
  align-items: flex-start;
  grid-template-rows: 310px;
  grid-auto-rows: 310px;
  grid-area: cards;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @include media-queries((
    phone: (
      grid-template-columns: 1fr,
    ),
  ))
}

.users-page__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  grid-area: pagination;
}
</style>
