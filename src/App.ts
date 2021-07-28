class App {
  UI: UI;
  page: number = 1;
  router: Router;
  routes: Route[] = [
    {
      name: "Home",
      url: "/",
      title: "Home - Spotify Client",
      pageComponent: new Home(),
    },
    {
      name: "Search",
      url: "/search",
      title: "Search - Spotify Client",
      pageComponent: new Search(),
    },
  ];

  constructor({ ui }: { ui: UI }) {
    this.UI = ui;

    this.router = new Router({
      container: document.querySelector("#main-section")!,
      routes: this.routes,
    });
  }

  async initApp() {
    await this.initRoute();

    // this.createHomePage();
  }

  async createHomePage() {
    // const homePage = new Home({
    //   container: document.querySelector("#main-section")!,
    // });
    // homePage.render();
    // //TODO: generate sidebar
    // this.displaySidebar();
    // //TODO: generate new release album
    // await this.displayNewReleaseAlbum();
    // this.UI.initInfiniteLoad();
  }

  // async createSearchPage() {
  //   alert("tes");
  // }

  // async displayNewReleaseAlbum() {
  //   const newRelease = await this.spotify.getNewRelease(this.page);

  //   if (!newRelease.albums.items.length) {
  //     this.UI.removeInfiniteLoad();
  //     return;
  //   }

  //   this.UI.createNewReleaseAlbum(newRelease);
  // }

  // displaySidebar() {
  //   this.UI.createSidebar();
  // }

  initRoute() {
    this.router.init();
  }
}
