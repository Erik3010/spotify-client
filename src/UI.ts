class UI {
  elementSelector: Record<string, string> = {
    songContainer: "#song-list-container",
    mainWrapper: "#main-wrapper",
  };
  sidebar!: Sidebar;

  async createSidebar() {
    const container = <HTMLInputElement>(
      document.querySelector(this.elementSelector.mainWrapper)
    );

    this.sidebar = new Sidebar({ container });

    await this.sidebar.render();
    await this.sidebar.mounted();
  }

  async createNewReleaseAlbum(newRelease: NewReleaseAlbumResponse) {
    const container = <HTMLInputElement>(
      document.querySelector(this.elementSelector.songContainer)!
    );

    const CardComponent = new NewReleaseCard({
      container,
      albums: newRelease,
      sidebar: this.sidebar,
    });

    await CardComponent.render();
    await CardComponent.mounted();
  }
}
