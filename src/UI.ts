class UI {
  elementSelector: Record<string, string> = {
    songContainer: "#song-list-container",
    mainWrapper: "#main-wrapper",
    mainContent: "#main-content",
    loadingContainer: "#infinite-loading-container",
  };
  sidebar!: Sidebar;
  circularLoading!: CircularLoading;
  isLoadingNewRelease: boolean = false;
  scrollHandlerFn = this.scrollHandler.bind(this);

  async createSidebar() {
    const container = <HTMLElement>(
      document.querySelector(this.elementSelector.mainWrapper)
    );

    this.sidebar = new Sidebar({ container });

    await this.sidebar.render();
    await this.sidebar.mounted();
  }

  async createNewReleaseAlbum(newRelease: NewReleaseAlbumResponse) {
    const container = <HTMLElement>(
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

  initInfiniteLoad() {
    this.circularLoading = new CircularLoading({
      container: document.querySelector(
        `${this.elementSelector.loadingContainer}`
      )!,
    });

    window.addEventListener("scroll", this.scrollHandlerFn);
  }

  removeInfiniteLoad() {
    window.removeEventListener("scroll", this.scrollHandlerFn);
  }

  async scrollHandler() {
    const mainContent = <HTMLElement>(
      document.querySelector(`${this.elementSelector.mainContent}`)
    );

    const paddingBottom = 20;

    const currentPosition = window.scrollY + window.innerHeight;
    const totalHeight = mainContent.scrollHeight - paddingBottom;

    if (currentPosition >= totalHeight && !this.isLoadingNewRelease) {
      this.circularLoading.render();

      app.page++;

      this.isLoadingNewRelease = true;
      await app.displayNewReleaseAlbum();
      this.isLoadingNewRelease = false;

      this.circularLoading.destroy();
    }
  }
}
