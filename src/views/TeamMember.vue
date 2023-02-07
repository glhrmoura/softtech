<template>
  <div class="team-member container">
    <Loading
      v-if="loading"
      :active="true"
      :is-full-page="false"
    />

    <section v-else-if="member" class="team-member__content">
      <div class="team-member__info-header">
        <img
          alt="Team member photo"
          :srcset="member.picture.large"
          class="team-member__picture"
        />
        <h1 class="team-member__name">
          {{ member.name.first }} {{ member.name.last }}
        </h1>
      </div>
      <div class="team-member__info-container">
        <ul class="team-member__infos">
          <li class="team-member__info">
            <span class="team-member__info-name">
              <img :src="require('@/assets/icons/email.svg')" alt="Envelope icon">
            </span>
            <span class="team-member__info-value">
              {{ member.email }}
            </span>
          </li>
          <li class="team-member__info">
            <span class="team-member__info-name">
              <img :src="require('@/assets/icons/phone.svg')" alt="Smartphone icon">
            </span>
            <span class="team-member__info-value">
              {{ member.phone }}
            </span>
          </li>
          <li class="team-member__info">
            <span class="team-member__info-name">
              <img :src="require('@/assets/icons/location.svg')" alt="Building icon">
            </span>
            <span class="team-member__info-value">
              {{ member.location.city }}, {{ member.location.state }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TeamMember',

  data() {
    return {
      member: null,
      loading: false,
    };
  },

  mounted() {
    this.loadTeamMember();
  },

  methods: {
    async loadTeamMember() {
      this.loading = true;

      const { username } = this.$route.params;

      try {
        this.member = await this.$store.dispatch('team/fetchTeamMember', { username });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.team-member {
  display: flex;
  justify-content: center;
  padding: 16px;
  height: max-content;
  min-height: 100%;
}

.team-member__content {
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

.team-member__info-header {
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

.team-member__name {
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

.team-member__picture {
  border-radius: 100%;
  width: 150px;
  height: 150px;
  border: 1px solid $primaryBorderColor;
}

.team-member__info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-member__infos {
  padding: 0px;
  margin: 0px;
  list-style: none;
  width: 100%;
}

.team-member__info {
  display: flex;
  align-items: center;
  margin: 12px;
  padding: 18px 0px;

  &:not(:last-child) {
    border-bottom: 1px solid $primaryBorderColor;
  }
}

.team-member__info-name {
  margin-right: 16px;

  img {
    height: 25px;
    width: 25px;
  }
}

.team-member__info-value {
  flex: 1;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  line-height: 2;
}

.team-member__info:nth-child(3), .team-member__info:nth-child(4) {
  .team-member__info-value {
    text-transform: capitalize;
  }
}
</style>
