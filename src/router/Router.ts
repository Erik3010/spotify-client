class Router {
  urlParser: UrlParser = new UrlParser();
  container: HTMLElement;
  routes: Route[];
  currentPage!: Route;

  lastRoute!: Route;

  constructor({
    container,
    routes,
  }: {
    container: HTMLElement;
    routes: Route[];
  }) {
    this.container = container;
    this.routes = routes;
  }
  async init() {
    await this.routerHandler();

    window.addEventListener("hashchange", this.routerHandler.bind(this));
  }
  async routerHandler() {
    if (this.lastRoute) this.lastRoute.pageComponent.unmount();

    const path = UrlParser.getCurrentRoutePath();

    this.currentPage = this.routes.find((route) => route.url === path)!;
    document.title = this.currentPage.title;

    this.lastRoute = this.currentPage;

    await this.renderPage();
  }
  async renderPage() {
    await this.currentPage.pageComponent.render();
    await this.currentPage.pageComponent.mounted();
  }
}
