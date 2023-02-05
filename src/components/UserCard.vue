<template>
  <RouterLink class="user-card" tag="div" :to="`/users/${user.username}`">
    <img
      alt="User profile picture"
      :srcset="user.picture.large"
      class="user-card__picture"
    />
    <h3 class="user-card__name">
      {{ user.name.first }} {{ user.name.last }}
    </h3>
    <p class="user-card__username">
      @{{ user.username }}
    </p>
  </RouterLink>
</template>

<script>
export default {
  name: 'UserCard',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  position: relative;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  border: 1px solid $primaryBorderColor;
  padding: 24px;
  text-align: center;
  background-color: $primaryBgColor;
  cursor: pointer;
  box-shadow: 0px 0px 4px 0px $boxShadowColor;
}

.user-card__name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
  height: 60px;
  margin: 12px 0px 12px 0px;
  text-transform: capitalize;
}

.user-card__picture {
  border-radius: 100%;
  width: 150px;
  height: 150px;
  border: 1px solid $primaryBorderColor;
}

.user-card__username {
  font-size: 16px;
  font-weight: 100;
  margin: 0px;
}
</style>
