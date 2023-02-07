<template>
  <transition name="slide">
    <aside class="team-member-filter__container" v-if="isDesktop || filterVisibility">
      <form class="team-member-filter__content" @submit.prevent>
        <div class="team-member-filter__group">
          <h4 class="team-member-filter__group__title">
            Name
          </h4>

          <div class="team-member-filter__input-text__container">
            <img
              alt="Search icon"
              :src="require('@/assets/icons/search.svg')"
            />

            <input
              type="search"
              v-model="filters.name"
              placeholder="Type name"
            />
          </div>
        </div>

        <div class="team-member-filter__group">
          <h4 class="team-member-filter__group__title">
            Years at SoftTech
          </h4>

          <div class="team-member-filter__range-slider">
            <div class="team-member-filter__range-slider__value">
              0
            </div>

            <range-slider
              min="0"
              step="1"
              max="20"
              v-model="filters.yearsAtCompany"
            />

            <div class="team-member-filter__range-slider__value">
              {{ filters.yearsAtCompany }}
            </div>
          </div>
        </div>

         <div class="team-member-filter__group">
          <h4 class="team-member-filter__group__title">
            Gender
          </h4>

          <ul class="team-member-filter__group__items">
            <li class="team-member-filter__group__item">
              <Checkbox
                v-model="filters.genders"
                label="Female"
                name="team-member-gender"
                value="female"
                @input="onInput"
              />
            </li>

            <li class="team-member-filter__group__item">
              <Checkbox
                v-model="filters.genders"
                label="Male"
                name="team-member-gender"
                value="male"
                @input="onInput"
              />
            </li>
          </ul>
        </div>

        <div class="team-member-filter__group">
          <h4 class="team-member-filter__group__title">
            Department
          </h4>

          <ul class="team-member-filter__group__items">
            <li class="team-member-filter__group__item">
              <Checkbox
                v-model="filters.departments"
                label="Administrative"
                name="member-department"
                value="administrative"
                @input="onInput"
              />
            </li>

            <li class="team-member-filter__group__item">
              <Checkbox
                v-model="filters.departments"
                label="Sales"
                name="member-department"
                value="sales"
                @input="onInput"
              />
            </li>

            <li class="team-member-filter__group__item">
              <Checkbox
                v-model="filters.departments"
                label="Tech"
                name="member-department"
                value="tech"
                @input="onInput"
              />
            </li>
          </ul>
        </div>
      </form>

      <div v-show="isMobile" class="team-member-filter__btn-container">
        <button @click="close" class="btn btn-block btn-primary">
          Done!
        </button>
      </div>
    </aside>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import RangeSlider from 'vue-range-slider';

import Checkbox from '@/components/Checkbox';

export default {
  name: 'TeamMemberFilter',

  components: {
    Checkbox,
    RangeSlider,
  },

  props: {
    filters: Object,
  },

  methods: {
    close() {
      this.$store.commit('header/SET_FILTER', false);
    },

    onInput() {
      this.$emit('input');
    },
  },

  computed: {
    ...mapGetters({
      isDesktop: 'device/isDesktop',
      isMobile: 'device/isMobile',
      filterVisibility: 'header/filterVisibility',
    }),
  },
};
</script>

<style lang="scss">
$filter-width: 250px;

.slide-enter,
.slide-leave-to {
  transform: translateX(-100vw);
}

.team-member-filter__btn-container {
  display: flex;
  padding: 8px;
  width: $filter-width;
  border-top: 1px solid $primaryBorderColor;
}

.team-member-filter__container {
  position: absolute;
  height: 100%;
  left: 0px;
  width: $filter-width;
  border-right: 1px solid $primaryBorderColor;
  background-color: $primaryBgColor;
  grid-area: filters;

  @include media-queries(
    (
      phone: (
        position: fixed,
        top: 60px,
        z-index: 10,
        transition: transform 0.3s,
        box-shadow: 4px 4px 20px 0px $boxShadowColor,
      ),
    )
  );
}

.team-member-filter__content {
  overflow: auto;
  height: 100%;
  width: $filter-width;

  @include media-queries(
    (
      phone: (
        height: calc(100% - 175px),
      ),
    )
  );
}

.team-member-filter__range-slider {
  display: flex;
  align-items: center;

  .team-member-filter__range-slider__value {
    width: 30px;
    text-align: center;
    font-size: 14px;
  }
}

.team-member-filter__input-text__container {
  position: relative;

  img {
    position: absolute;
    top: 10px;
    left: 15px;
    height: 20px;
    width: 20px;
  }

  input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 3rem;
    border: none;
    background-color: $tertiaryBgColor;
    border-radius: 2rem;;
    outline: none;
  }
}

.team-member-filter__group {
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.team-member-filter__group__title {
  font-size: 12px;
  font-weight: 800;
  margin: 0px 0px 16px 0px;
}

.team-member-filter__group__items {
  padding: 0px;
  margin: 0px;
  list-style: none;
}
</style>
