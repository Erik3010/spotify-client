class NewReleaseCard implements Renderable {
  container: HTMLElement;
  sidebar: Sidebar;
  sidebarSelector: Record<string, string> = {
    cover: "#sidebar-cover",
    title: "#sidebar-title",
    releaseDate: "#sidebar-release-date",
  };
  album: AlbumItem;

  constructor({
    container,
    sidebar,
    album,
  }: {
    container: HTMLElement;
    sidebar: Sidebar;
    album: AlbumItem;
  }) {
    this.container = container;
    this.sidebar = sidebar;
    this.album = album;
  }
  html(item = null): string {
    return `
      <article id="album-${
        this.album.id
      }" class="song-card rounded-xl bg-gray-700 p-5 w-full song-card">
        <div class="relative">
          <div class="h-48 overflow-hidden rounded-lg">
            <img src="${this.album.images[0].url}"
              alt="Cover"
              class="w-full h-full object-cover transition transform hover:scale-110 cursor-pointer">
          </div>
          <div class="mt-4">
            <a class="font-bold text-xl hover:underline cursor-pointer">${
              this.album.name
            }</a>
            <p class="text-sm text-gray-400 mt-1">${Utility.dateFormat(
              this.album.release_date
            )}</p>
          </div>
          <div
            class="absolute top-3 right-3 rounded-full bg-green-500 w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </div>
        </div>
      </article>
    `;
  }
  async render() {
    this.container.insertAdjacentHTML("beforeend", this.html());
  }
  async mounted() {
    const sidebar = <HTMLElement>document.querySelector("#sidebar");
    const cards = <NodeListOf<Element>>(
      document.querySelectorAll(`#album-${this.album.id}`)
    );

    for (let card of <any>cards) {
      const cardCover = card.querySelector("img");
      cardCover.addEventListener("click", () => {
        Utility.modifyClass("remove", sidebar, ["translate-x-full"]);

        Utility.modifyClass("add", sidebar, ["translate-x-0"]);
        Utility.modifyClass(
          "add",
          <HTMLElement>document.querySelector("#main-content"),
          ["md:mr-96"]
        );

        this.sidebar.album = {
          title: this.album.name,
          cover: this.album.images[0].url,
          releaseDate: this.album.release_date,
          artists: this.album.artists,
        };
      });
    }
  }
}
