const spotifyService = new SpotifyService({
  clientId: "b6fec45e2e674f43a79579a66f57d262",
  clientSecret: "570e51197e5644e0ac042dd0f2ed3f1a",
});

const app = new App({
  spotify: spotifyService,
  ui: new UI(),
});

window.onload = async () => {
  await app.initApp();
};
