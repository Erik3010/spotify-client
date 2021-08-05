class Home implements Renderable, Unmountable {
  container: HTMLElement = <HTMLElement>document.querySelector("#main-section");
  UI: UI = new UI();
  spotify = new SpotifyService();
  page = 1;
  totalAlbum!: number;

  selector: Record<string, string> = {
    loadingContainer: "#infinite-loading-container",
  };

  loadingComponent!: CircularLoading;
  isLoading = false;

  scrollHandler = this._scrollHandler.bind(this);

  html(): string {
    return `
      <!-- section title -->
      <header class="flex justify-between items-center">
        <div>
          <p class="text-gray-400 text-sm font-medium">Album</p>
          <h2 class="text-2xl font-bold">New Release</h2>
        </div>
        <div>
          <a href="#" class="text-green-500 font-medium text-sm sm:text-base hover:underline">See More</a>
        </div>
      </header>
      <!-- end section title -->

      <!-- content section -->
      <div class="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7" id="song-list-container">
      </div>
      <!-- end content section -->

      <div id="infinite-loading-container" class="flex justify-center mt-10"></div>
    `;
  }
  async render() {
    this.container.innerHTML = this.html();
  }
  async mounted() {
    await this.spotify.init();

    this.UI.createSidebar();

    await this._displayNewReleaseAlbum();

    this._initInfiniteLoad();
  }
  async _displayNewReleaseAlbum() {
    const newReleaseAlbum = await this.spotify.getNewRelease(this.page);
    this.totalAlbum = newReleaseAlbum.albums.total;

    this.UI.createNewReleaseAlbum(newReleaseAlbum);
  }
  _initInfiniteLoad() {
    const loadingContainer = <HTMLElement>(
      document.querySelector(`${this.selector.loadingContainer}`)
    );

    this.loadingComponent = new CircularLoading({
      container: loadingContainer,
    });

    window.addEventListener("scroll", this.scrollHandler);
  }
  async _scrollHandler() {
    if (this.page * this.spotify.limit === this.totalAlbum) {
      return;
    }

    const mainSection = <HTMLElement>document.querySelector("#main-section");

    const currentPosition = window.scrollY + window.innerHeight;
    const totalHeight = mainSection.scrollHeight;

    if (currentPosition >= totalHeight && !this.isLoading) {
      this.loadingComponent.render();

      this.page++;

      this.isLoading = true;
      await this._displayNewReleaseAlbum();
      this.isLoading = false;

      this.loadingComponent.destroy();
    }
  }
  _removeInfiniteLoad() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
  unmount() {
    this.UI.sidebar.closeSidebar();
    this._removeInfiniteLoad();
  }
}
