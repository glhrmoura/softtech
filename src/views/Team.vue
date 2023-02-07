<template>
  <div class="team-page container">
    <TeamMemberFilter
      :filters="filters"
      @input="onFilter"
    />

    <Loading
      v-if="loading"
      :active="true"
      :is-full-page="false"
    />

    <section v-else-if="teamFiltered.length" class="team-page__cards">
      <TeamMemberCard
        :member="member"
        :key="member.email"
        v-for="member in teamPaginated"
      />
    </section>

    <div v-else class="team-page__empty-result">
      <p>No team found</p>
    </div>

    <div v-if="!loading && pageCount" class="team-page__pagination">
      <Pagination
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

import {
  byName,
  byGender,
  byDepartments,
  byYearsAtCompany,
} from '@/utils/team';

import TeamMemberCard from '@/components/TeamMemberCard';
import TeamMemberFilter from '@/components/TeamMemberFilter';

import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Team',

  components: {
    Pagination,
    TeamMemberCard,
    TeamMemberFilter,
  },

  data () {
    return {
      selected: 1,

      loading: false,

      team: [],

      filters: {
        name: '',
        genders: [],
        departments: [],
        yearsAtCompany: 0,
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

      this.team = await this.$store.dispatch('team/fetchTeam');
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
      return this.teamFiltered.length;
    },

    teamPaginated() {
      const { pagination = {} } = this;

      const paginate = !pagination.skip
        ? [0, pagination.perPage]
        : [ pagination.skip, pagination.skip + pagination.perPage ];

      return this.teamFiltered.slice(...paginate);
    },

    teamFiltered() {
      const { filters = {} } = this;

      return this.team
        .filter(byName(filters.name))
        .filter(byGender(filters.genders))
        .filter(byDepartments(filters.departments))
        .filter(byYearsAtCompany(filters.yearsAtCompany));
    },
  },

  beforeDestroy() {
    this.$store.commit('header/SET_FILTER', false);
  },
};
</script>

<style lang="scss" scoped>
.team-page {
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

.team-page__empty-result {
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

.team-page__loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-page__cards {
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

.team-page__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  grid-area: pagination;
}
</style>
