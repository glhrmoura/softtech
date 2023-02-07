export const vuexInit = () => ({
  mounted() {
    Object.keys(this.$store.state).forEach((key) => {
      this.$store.dispatch(`${key}/mounted`);
    });
  }
});

export const vuexStore = (target) => {
  const output = {
    namespaced: true,
    actions: {},
    ...target,
  };

  output.actions = {
    mounted: target.mounted || function () {},
    ...output.actions,
  };

  return output;
};
