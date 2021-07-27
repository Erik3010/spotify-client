class NewReleaseCard implements Renderable {
  albums: NewReleaseAlbumResponse;
  container: HTMLInputElement;
  sidebar: Sidebar;
  sidebarSelector: Record<string, string> = {
    cover: "#sidebar-cover",
    title: "#sidebar-title",
    releaseDate: "#sidebar-release-date",
  };

  constructor({
    container,
    albums,
    sidebar,
  }: {
    container: HTMLInputElement;
    albums: NewReleaseAlbumResponse;
    sidebar: Sidebar;
  }) {
    this.albums = albums;
    this.container = container;
    this.sidebar = sidebar;
  }
  html(albumItem: AlbumItem): string {
    return `
      <article class="song-card rounded-xl bg-gray-700 p-5 w-full song-card" data-id="${
        albumItem.id
      }">
        <div class="relative">
          <div class="h-48 overflow-hidden rounded-lg">
            <img src="${albumItem.images[0].url}"
              alt="Cover"
              class="w-full h-full object-cover transition transform hover:scale-110 cursor-pointer">
          </div>
          <div class="mt-4">
            <a href="#" class="font-bold text-xl hover:underline">${
              albumItem.name
            }</a>
            <p class="text-sm text-gray-400 mt-1">${Utility.dateFormat(
              albumItem.release_date
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
    this.container.innerHTML = this.albums.albums.items
      .map((item) => this.html(item))
      .join("");
  }
  async mounted() {
    const sidebar = <HTMLInputElement>document.querySelector("#sidebar");
    const cards = <NodeListOf<Element>>document.querySelectorAll(".song-card");

    // const sidebarItem = {
    //   cover: <HTMLInputElement>(
    //     document.querySelector(this.sidebarSelector.cover)
    //   ),
    //   title: <HTMLInputElement>(
    //     document.querySelector(this.sidebarSelector.title)
    //   ),
    //   releaseDate: <HTMLInputElement>(
    //     document.querySelector(this.sidebarSelector.releaseDate)
    //   ),
    // };

    for (let card of <any>cards) {
      card.addEventListener("click", () => {
        Utility.modifyClass("remove", sidebar, ["translate-x-full"]);

        Utility.modifyClass("add", sidebar, ["translate-x-0"]);
        Utility.modifyClass(
          "add",
          <HTMLInputElement>document.querySelector("#main-content"),
          ["md:mr-96"]
        );

        const id = card.dataset.id;
        const album = this.albums.albums.items.find((item) => item.id === id)!;

        this.sidebar.album = {
          title: album.name,
          cover: album.images[0].url,
          releaseDate: album.release_date,
          artists: album.artists,
        };

        // sidebarItem.cover.src = album?.images[0].url!;
        // sidebarItem.title.innerHTML = album?.name!;
        // sidebarItem.releaseDate.innerHTML = Utility.dateFormat(
        //   album?.release_date!
        // );
      });
    }
  }
}
