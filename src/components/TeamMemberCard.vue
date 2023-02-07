<template>
  <RouterLink class="team-member-card" tag="div" :to="`/team/${member.username}`">
    <img
      alt="Team member profile picture"
      :srcset="member.picture.large"
      class="team-member-card__picture"
    />

    <h3 class="team-member-card__name">
      {{ member.name.first }} {{ member.name.last }}
    </h3>

    <p class="team-member-card__username">
      @{{ member.username }}
    </p>
  </RouterLink>
</template>

<script>
export default {
  name: 'TeamMemberCard',

  props: {
    member: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.team-member-card {
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

.team-member-card__picture {
  border-radius: 100%;
  width: 150px;
  height: 150px;
  border: 1px solid $primaryBorderColor;
}

.team-member-card__name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
  height: 60px;
  margin: 12px 0px 8px 0px;
  text-transform: capitalize;
}

.team-member-card__username {
  font-size: 16px;
  font-weight: 100;
  margin: 0px;
}
</style>
