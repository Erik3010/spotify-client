class App {
  spotify: SpotifyService;
  UI: UI;
  page: number = 1;

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

    this.UI.initInfiniteLoad();
  }

  async displayNewReleaseAlbum() {
    const newRelease = await this.spotify.getNewRelease(this.page);

    if (!newRelease.albums.items.length) {
      this.UI.removeInfiniteLoad();
      return;
    }

    this.UI.createNewReleaseAlbum(newRelease);
  }

  displaySidebar() {
    this.UI.createSidebar();
  }
}
