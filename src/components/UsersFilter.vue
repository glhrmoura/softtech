<template>
  <transition name="slide">
    <aside
      class="users-filter__container"
      v-if="isDesktop || filterVisibility"
    >
      <form class="users-filter__content" @submit.prevent>
        <div class="users-filter__group">
          <h4 class="users-filter__group__title">
            NAME
          </h4>
          <div class="users-filter__input-text__container">
            <img :src="require('@/assets/icons/search.svg')" alt="Search icon" />
            <input
              type="search"
              v-model="filters.name"
              placeholder="Type name"
            />
          </div>
        </div>
        <div class="users-filter__group">
          <h4 class="users-filter__group__title">
            AGE
          </h4>
          <div class="users-filter__range-slider">
            <div class="users-filter__range-slider__value">
              0
            </div>
            <range-slider
              min="0"
              step="1"
              max="100"
              v-model="filters.age"
            />
            <div class="users-filter__range-slider__value">
              {{ filters.age }}
            </div>
          </div>
        </div>
        <div class="users-filter__group">
          <h4 class="users-filter__group__title">
            TYPE
          </h4>
          <ul class="users-filter__group__items">
            <li class="users-filter__group__item">
              <Checkbox
                v-model="filters.types"
                label="SPECIAL"
                name="user-type"
                value="special"
                @input="onInput"
              />
            </li>
            <li class="users-filter__group__item">
              <Checkbox
                v-model="filters.types"
                label="NORMAL"
                name="user-type"
                value="normal"
                @input="onInput"
              />
            </li>
            <li class="users-filter__group__item">
              <Checkbox
                v-model="filters.types"
                label="HARD   WORK"
                name="user-type"
                value="hard-work"
                @input="onInput"
              />
            </li>
          </ul>
        </div>
        <div class="users-filter__group">
          <h4 class="users-filter__group__title">
            GENDER
          </h4>
          <ul class="users-filter__group__items">
            <li class="users-filter__group__item">
              <Checkbox
                v-model="filters.genders"
                label="MALE"
                name="user-gender"
                value="male"
                @input="onInput"
              />
            </li>
            <li class="users-filter__group__item">
              <Checkbox
                v-model="filters.genders"
                label="FEMALE"
                name="user-gender"
                value="female"
                @input="onInput"
              />
            </li>
          </ul>
        </div>
      </form>
      <div v-show="isMobile" class="users-filter__btn-container">
        <button @click="close" class="btn btn-block btn-primary">
          Feito
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
  name: 'UsersFilter',

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

.users-filter__btn-container {
  display: flex;
  padding: 8px;
  width: $filter-width;
  border-top: 1px solid $primaryBorderColor;
}

.users-filter__container {
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

.users-filter__content {
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

.users-filter__range-slider {
  display: flex;
  align-items: center;

  .users-filter__range-slider__value {
    width: 30px;
    text-align: center;
    font-size: 14px;
  }
}

.users-filter__input-text__container {
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

.users-filter__group {
  padding: 12px;
  display: flex;
  flex-direction: column;
  margin: 0px 0px 8px 0px;
}

.users-filter__group__title {
  font-size: 12px;
  font-weight: 800;
  margin: 0px 0px 16px 0px;
}

.users-filter__group__items {
  padding: 0px;
  margin: 0px;
  list-style: none;
}
</style>
