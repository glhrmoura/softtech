<template>
  <div class="user-details container">
    <Loading
      v-if="loading"
      :active="true"
      :is-full-page="false"
    />

    <section v-else-if="user" class="user-details__content">
      <div class="user-details__info-header">
        <img
          alt="User photo"
          :srcset="user.picture.large"
          class="user-details__picture"
        />
        <h1 class="user-details__name">
          {{ user.name.first }} {{ user.name.last }}
        </h1>
      </div>
      <div class="user-details__info-container">
        <ul class="user-details__infos">
          <li class="user-details__info">
            <span class="user-details__info-name">
              <img :src="require('@/assets/icons/email.svg')" alt="Envelope icon">
            </span>
            <span class="user-details__info-value">
              {{ user.email }}
            </span>
          </li>
          <li class="user-details__info">
            <span class="user-details__info-name">
              <img :src="require('@/assets/icons/phone.svg')" alt="Smartphone icon">
            </span>
            <span class="user-details__info-value">
              {{ user.phone }}
            </span>
          </li>
          <li class="user-details__info">
            <span class="user-details__info-name">
              <img :src="require('@/assets/icons/location.svg')" alt="Building icon">
            </span>
            <span class="user-details__info-value">
              {{ user.location.city }}, {{ user.location.state }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',

  data() {
    return {
      user: null,
      loading: false,
    };
  },

  mounted() {
    this.loadUser();
  },

  methods: {
    async loadUser() {
      this.loading = true;

      const { username } = this.$route.params;

      const payload = {
        username,
      };

      try {
        this.user = await this.$store.dispatch('users/fetchUser', payload);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-details {
  display: flex;
  justify-content: center;
  padding: 16px;
  height: max-content;
  min-height: 100%;
}

.user-details__content {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 6px;
  text-align: center;
  background-color: $primaryBgColor;
  margin: 12px;
  min-width: 700px;
  margin-bottom: 200px;

  @include media-queries((
    phone: (
      padding: 0px,
      min-width: 100%,
      margin-bottom: 0px,
      align-items: stretch,
      flex-direction: column,
    ),
    tablet: (
      min-width: 600px,
    ),
  ))
}

.user-details__info-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 52px;

  @include media-queries((
    phone: (
      margin-right: 0px,
    ),
  ))
}

.user-details__name {
  text-transform: capitalize;
  font-size: 45px;
  font-weight: 900;
  transition: font-size 0.5s;

  @include media-queries((
    phone: (
      font-size: 24px,
    ),
    tablet: (
      font-size: 32px,
    ),
  ))
}

.user-details__picture {
  border-radius: 100%;
  width: 150px;
  height: 150px;
  border: 1px solid $primaryBorderColor;
}

.user-details__info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-details__infos {
  padding: 0px;
  margin: 0px;
  list-style: none;
  width: 100%;
}

.user-details__info {
  display: flex;
  align-items: center;
  margin: 12px;
  padding: 18px 0px;

  &:not(:last-child) {
    border-bottom: 1px solid $primaryBorderColor;
  }
}

.user-details__info-name {
  margin-right: 16px;

  img {
    height: 25px;
    width: 25px;
  }
}

.user-details__info-value {
  flex: 1;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  line-height: 2;
}

.user-details__info:nth-child(3), .user-details__info:nth-child(4) {
  .user-details__info-value {
    text-transform: capitalize;
  }
}
</style>
