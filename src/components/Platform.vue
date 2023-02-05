<template>
  <div class="platform">
    <header class="platform-top">
      <slot name="top" />
    </header>

    <main class="platform-inner">
      <slot name="inner" />
    </main>

    <nav v-if="isMobile" class="platform-bottom-bar">
      <slot name="bottom" />
    </nav>

    <footer v-if="isDesktop" class="platform-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Platform',
  computed: {
    ...mapGetters({
      isMobile: 'device/isMobile',
      isDesktop: 'device/isDesktop',
    }),
  },
};
</script>

<style lang="scss">
.platform {
  position: relative;
  display: grid;
  width: 100%;
  min-height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr auto;
  grid-template-areas:
    'platform-top'
    'platform-inner'
    'platform-footer';

  @include media-queries(
    (
      phone: (
        position: fixed,
        height: 100%,
        width: 100%,
        grid-template-columns: 1fr,
        grid-template-rows: 60px 1fr 60px,
        grid-template-areas:
          'platform-top'
          'platform-inner'
          'platform-bottom-bar',
      ),
    )
  );
}

.platform-top {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: $primaryBgColor;
  z-index: 2;
  grid-area: platform-top;

  @include media-queries(
    (
      phone: (
        position: relative,
        height: 60px,
        max-width: 100%,
      ),
    )
  );
}

.platform-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  max-width: 100%;
  z-index: 1;
  grid-area: platform-inner;

  @include media-queries(
    (
      phone: (
        padding: 0px,
        min-height: 100%,
        overflow: auto,
        -webkit-overflow-scrolling: touch,
      ),
    )
  );
}

.platform-bottom-bar {
  position: relative;
  display: none;
  z-index: 10;
  height: 60px;
  width: 100%;
  border-top: 1px solid $primaryBorderColor;
  background-color: $primaryBgColor;
  grid-area: platform-bottom-bar;

  @include media-queries(
    (
      phone: (
        display: block,
        bottom: 0px,
      ),
    )
  );
}

.platform-footer {
  grid-area: platform-footer;
}
</style>
