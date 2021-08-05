class Badge implements Renderable {
  container: HTMLElement;
  artist: Artist;

  constructor({
    container,
    artist,
  }: {
    container: HTMLElement;
    artist: Artist;
  }) {
    this.container = container;
    this.artist = artist;
  }
  html(): string {
    return `
      <div class="bg-gray-700 inline py-1 px-3 mr-1 mt-1 rounded-sm text-xs cursor-pointer hover:bg-gray-800">${this.artist.name}</div>
    `;
  }
  render(): void {
    this.container.insertAdjacentHTML("beforeend", this.html());
  }
  mounted(): void {}
}
