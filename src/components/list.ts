class List implements Renderable {
  album: AlbumItem;
  container: HTMLElement;

  constructor({
    album,
    container,
  }: {
    album: AlbumItem;
    container: HTMLElement;
  }) {
    this.album = album;
    this.container = container;
  }
  html(): string {
    return `
      <div class="song-list flex py-4">
        <img class="flex-none w-18 h-18 rounded-lg object-cover"
          src="${this.album.images[0].url}" alt="${
      this.album.name
    }" width="84" height="84">
        <div class="flex-auto ml-4">
          <h2 class="text-lg font-semibold text-gray-100 mb-0.5 hover:underline cursor-pointer">
            ${this.album.name}
          </h2>
          <div class="text-sm text-gray-400">
            ${Utility.dateFormat(this.album.release_date)}
          </div>
        </div>
      </div>
    `;
  }
  render() {
    this.container.insertAdjacentHTML("beforeend", this.html());
  }
  mounted() {
    throw new Error("Method not implemented.");
  }
}
