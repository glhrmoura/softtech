<template>
  <div class="mobile-nav">
    <RouterLink tag="div" exact to="/" class="mobile-nav__item">
      <div
        class="mobile-nav__item-icon"
        :style="{
          mask: `url('${require('@/assets/icons/home.svg')}')`,
          webkitMask: `url('${require('@/assets/icons/home.svg')}')`,
          maskRepeat: 'no-repeat',
          webkitMaskRepeat: 'no-repeat',
          maskSize: 'contain',
          webkitMaskSize: 'contain',
          maskPosition: 'center',
          webkitMaskPosition: 'center',
        }"
      />
    </RouterLink>

    <RouterLink tag="div" to="/team" class="mobile-nav__item">
      <div
        class="mobile-nav__item-icon"
        :style="{
          mask: `url('${require('@/assets/icons/team.svg')}')`,
          webkitMask: `url('${require('@/assets/icons/team.svg')}')`,
          maskRepeat: 'no-repeat',
          webkitMaskRepeat: 'no-repeat',
          maskSize: 'contain',
          webkitMaskSize: 'contain',
          maskPosition: 'center',
          webkitMaskPosition: 'center',
        }"
      />
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'BottomNavigation',
};
</script>

<style lang="scss" scoped>
.mobile-nav {
  display: flex;
  align-items: center;
  height: 100%;
  color: $secondaryTextColor;
  z-index: 10;
  padding: 12px;
}

.mobile-nav__item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  flex: 1;
}

.mobile-nav__item-icon {
  max-height: 100%;
  height: 35px;
  width: 35px;
  background-color: $primaryIconColor;
}

.mobile-nav__item.router-link-active .mobile-nav__item-icon {
  background-color: $primaryColor;
}
</style>
