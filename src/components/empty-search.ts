class EmptySearch implements Renderable {
  container: HTMLElement;

  constructor({ container }: { container: HTMLElement }) {
    this.container = container;
  }
  html(): string {
    return `
      <div class="text-center flex flex-col h-full mt-20">
        <h1 class="text-2xl font-bold mb-2">Sorry 😟</h1>
        <p class="text-gray-400 font-medium">Nothing found in your search</p>
      </div>  
    `;
  }
  render(): void {
    this.container.innerHTML = this.html();
  }
  mounted(): void {
    throw new Error("Method not implemented.");
  }
}
