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
    this.initSearchInput();

    await this.initRoute();
  }

  initRoute() {
    this.router.init();
  }

  initSearchInput() {
    this.UI.initSearchInput();
  }
}
