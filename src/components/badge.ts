class Badge implements Renderable {
  container: HTMLInputElement;

  constructor({ container }: { container: HTMLInputElement }) {
    this.container = container;
  }
  html(item: any): string {
    return `
      <div class="bg-gray-700 inline py-1 px-3 rounded-sm text-xs cursor-pointer hover:bg-gray-800">Nama 123</div>
    `;
  }
  render(): void {}
  mounted(): void {}
}
