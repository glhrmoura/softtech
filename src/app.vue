<template>
  <Platform>
    <template slot="top">
      <Header />
    </template>
    <template slot="inner">
      <router-view />
    </template>
    <template slot="bottom">
      <MobileNav />
    </template>
    <template slot="footer">
      <Footer />
    </template>
  </Platform>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Platform from '@/components/Platform.vue';
import MobileNav from '@/components/MobileNav.vue';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    Platform,
    MobileNav,
  },
};
</script>
