<template>
  <div class="home-page">
    <section class="home-page__section">
      <video class="home-page__intro__video" loop autoplay muted>
        <source
          type="video/webm"
          :src="require('@/assets/videos/home-intro.webm')"
        />
        <source
          type="video/mp4"
          :src="require('@/assets/videos/home-intro.mp4')"
        />
      </video>
      <div class="home-page__intro-content">
        <div class="home-page__intro-content__center container">
          <h1 class="home-page__intro-content__title">
            Come be <span class="home-page__intro-content__title--spotlight">tech</span>
          </h1>
          <p class="home-page__intro-content__description">
            SoftTech offers innovative and customized solutions to improve its customers' efficiency and competitiveness.
          </p>
          <RouterLink
            tag="button"
            to="/users"
            class="btn btn-primary home-page__intro-content__btn-users"
          >
            Meet our users
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.home-page {
  position: relative;
  min-height: 100%;
  height: 100%;
}

.home-page__section {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);

  @include media-queries(
    (
      phone: (
        height: calc(100vh - 120px),
      ),
    )
  );
}

.home-page__intro__video {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  pointer-events: none;
  z-index: -1;
}

.home-page__intro-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $secondaryBgColor-0_5;
  padding: 0px 40px;
  color: $secondaryTextColor;
  text-align: center;

  @include media-queries(
    (
      phoneSm: (
        padding: 0px 16px,
      ),
      phone: (
        padding: 0px 20px,
      ),
    )
  );
}

.home-page__intro-content__center {
  max-width: 800px;
}

.home-page__intro-content__title {
  font-size: 42px;
  font-weight: 800;
  margin: 0px;

  @include media-queries(
    (
      phone: (
        font-size: 32px,
      ),
    )
  );
}

.home-page__intro-content__title--spotlight {
  background-color: $primaryColor;
  padding: 4px;
}

.home-page__intro-content__description {
  font-size: 20px;
  font-weight: 500;
  margin: 12px 0px 0px 0px;

  @include media-queries(
    (
      phone: (
        font-size: 16px,
        font-weight: 400,
      ),
    )
  );
}

.home-page__intro-content__btn-users {
  margin-top: 20px;

  @include media-queries(
    (
      phoneSm: (
        width: 100%,
      ),
    )
  );
}
</style>
