class Search implements Renderable, Unmountable {
  container: HTMLElement = <HTMLElement>document.querySelector("#main-section");
  spotify = new SpotifyService();
  elSelector = {
    songListContainer: "#song-list-container",
  };

  html(): string {
    return `
      <!-- section title -->
      <header class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl">You searched: <span class="font-bold" id="search-title">Song Name</span></h2>
        </div>
      </header>
      <!-- end section title -->

      <!-- content section -->
      <div class="mt-5 divide-y divide-gray-700" id="song-list-container">
        
      </div>
      <!-- end content section -->
    `;
  }
  async render() {
    this.container.innerHTML = this.html();
  }
  async mounted() {
    const searchInput = <HTMLInputElement>(
      document.querySelector("#search-input")
    );

    if (searchInput.value === "") {
      window.location.href = "#";
      return;
    }

    await this.spotify.init();

    const searchTitle = <HTMLElement>document.querySelector("#search-title");
    searchTitle.innerHTML = searchInput.value;

    const searchedAlbums = await this.spotify.searchAlbum({
      query: searchInput.value,
    });

    if (!searchedAlbums.albums.items.length) {
      new EmptySearch({
        container: <HTMLElement>(
          document.querySelector(this.elSelector.songListContainer)
        ),
      }).render();
      return;
    }

    searchedAlbums.albums.items.forEach((album) => {
      new List({
        album,
        container: <HTMLElement>(
          document.querySelector(this.elSelector.songListContainer)
        ),
      }).render();
    });
  }
  unmount() {
    const searchInput = <HTMLInputElement>(
      document.querySelector("#search-input")
    );

    searchInput.value = "";
  }
}
