class UI {
  elementSelector: Record<string, string> = {
    songContainer: "#song-list-container",
    mainWrapper: "#main-wrapper",
    searchInput: "#search-input",
    searchIcon: "#search-icon",
  };
  sidebar!: Sidebar;

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

  initSearchInput() {
    const searchInput = <HTMLElement>(
      document.querySelector(`${this.elementSelector.searchInput}`)
    );
    const searchIcon = <HTMLElement>(
      document.querySelector(`${this.elementSelector.searchIcon}`)
    );

    searchInput.addEventListener("transitionend", (e) => {
      const target = <HTMLInputElement>e.target;

      if (target.classList.contains("translate-x-full")) return;
      target.focus();
    });

    searchIcon.addEventListener("click", () => {
      Utility.modifyClass("remove", searchInput, ["translate-x-full"]);
      Utility.modifyClass("remove", searchIcon, ["rounded-lg"]);

      Utility.modifyClass("add", searchInput, ["translate-x-0"]);
    });

    searchInput.addEventListener("blur", () => {
      Utility.modifyClass("add", searchInput, ["translate-x-full"]);
      Utility.modifyClass("add", searchIcon, ["rounded-lg"]);

      Utility.modifyClass("remove", searchInput, ["translate-x-0"]);
    });

    searchInput.addEventListener("keydown", async (e) => {
      if (e.keyCode === 13) {
        if (window.location.hash.substring(1) === "search") {
          await app.router.renderPage();
        } else {
          window.location.href = `#search`;
        }
      }
    });
  }
}
