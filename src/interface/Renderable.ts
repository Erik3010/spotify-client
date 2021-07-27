interface Renderable {
  html(item: any): string;
  render(): void;
  mounted(): void;
}
