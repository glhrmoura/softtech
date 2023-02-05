<template>
  <div class="header">
    <div class="header__conatiner container">
      <template v-if="isMobile && $route.meta.subpage">
        <img
          alt="Filter icon"
          class="header__icon"
          :src="require('@/assets/icons/arrow-left.svg')"
          @click="$router.go(-1)"
        />
      </template>

      <RouterLink v-else to="/">
        <img
          class="header__logo"
          :src="require('@/assets/icons/logo.svg')"
        />
      </RouterLink>

      <nav v-if="isDesktop">
        <ul class="header__links">
          <li class="header__link">
            <RouterLink exact to="/">
              Home
            </RouterLink>
          </li>
          <li class="header__link">
            <RouterLink to="/users">
              Users
            </RouterLink>
          </li>
        </ul>
      </nav>

      <template v-else-if="$route.meta.filter">
        <img
          alt="Filter icon"
          class="header__icon"
          :src="require('@/assets/icons/filter.svg')"
          @click="$store.commit('header/TOGGLE_FILTER')"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',

  computed: {
    ...mapGetters({
      isDesktop: 'device/isDesktop',
      isMobile: 'device/isMobile',
    })
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 80px;
  top: 0px;
  left: 0px;
  padding: 20px;
  background-color: $primaryBgColor;
  border-bottom: 1px solid $primaryBorderColor;
  z-index: 10;

  @include media-queries((
    phone: (
      height: 65px,
      padding: 16px,
    )
  ))
}

.header__conatiner {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.header__logo {
  height: 100%;
}

.header__links {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 12px;
  margin: 0px;
  list-style: none;
}

.header__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0px 12px;
}

.header__icon {
  height: 100%;
  padding: 4px 0px;
}
</style>
