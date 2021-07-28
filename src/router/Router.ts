class Router {
  urlParser: UrlParser = new UrlParser();
  container: HTMLElement;
  routes: Route[];

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

    const currentPage = this.routes.find((route) => route.url === path)!;

    this.lastRoute = currentPage;

    await currentPage.pageComponent.render();
    await currentPage.pageComponent.mounted();
  }
}
