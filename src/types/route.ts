interface Route {
  name: string;
  url: string;
  title: string;
  pageComponent: Renderable & Unmountable;
}
