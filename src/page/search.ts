class Search implements Renderable, Unmountable {
  container: HTMLElement = <HTMLElement>document.querySelector("#main-section");

  html(item: any = null): string {
    return "asd";
  }
  async render() {
    this.container.innerHTML = this.html();
  }
  async mounted() {}
  unmount() {}
}
