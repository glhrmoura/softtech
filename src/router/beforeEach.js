export default (to, from, next) => {
  window.scrollTo(0, 0);
  next();
};
