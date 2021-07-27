class App {
  spotify: SpotifyService;
  UI: UI;

  constructor({ spotify, ui }: { spotify: SpotifyService; ui: UI }) {
    this.spotify = spotify;
    this.UI = ui;
  }

  async initApp() {
    await this.spotify.init();

    //TODO: generate sidebar
    this.displaySidebar();

    //TODO: generate new release album
    await this.displayNewReleaseAlbum();
  }

  async displayNewReleaseAlbum() {
    const newRelease = await this.spotify.getNewRelease();
    this.UI.createNewReleaseAlbum(newRelease);
  }

  displaySidebar() {
    this.UI.createSidebar();
  }
}
