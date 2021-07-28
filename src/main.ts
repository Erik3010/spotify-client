const app = new App({
  ui: new UI(),
});

window.onload = async () => {
  await app.initApp();
};
