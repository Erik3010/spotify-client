class Sidebar implements Renderable {
  container: HTMLInputElement;
  constructor({ container }: { container: HTMLInputElement }) {
    this.container = container;
  }
  html(item: any = null): string {
    return `
      <div id="sidebar"
        class="fixed bg-gray-900 shadow-3xl text-white inset-y-0 right-0 w-full md:w-96 transform transition duration-300 ease-in-out translate-x-full">
        <div
          class="flex justify-between w-full h-48 bg-gradient-to-b from-gray-600 to-gray-800 pl-9 pr-6 items-end py-4">
          <div class="w-32 h-32 shadow-3xl bg-gray-600 transform translate-y-1/2">
            <img src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=336&q=80"
              alt="" class="w-full h-full object-cover" id="sidebar-cover">
          </div>
          <div class="flex flex-col justify-between h-full items-center">
            <div class="cursor-pointer p-2 rounded-md" id="sidebar-button-close">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div
              class="h-10 w-10 bg-green-500 cursor-pointer hover:bg-green-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="px-9 mt-16">
          <div class="pt-1">
            <p class="font-medium text-sm text-gray-200">Album</p>
            <h1 class="text-3xl font-bold" id="sidebar-title">Power of the Dream</h1>
          </div>
          <div class="leading-6 text-gray-300 text-sm mt-4">
            <div>Release Date:</div>
            <div class="text-base font-medium" id="sidebar-release-date"></div>
          </div>
          <div class="leading-6 text-gray-300 text-sm mt-4">
            <div>Artists:</div>
            <div class="text-base font-medium mt-1" id="sidebar-artists"></div>
          </div>
        </div>
      </div>
    `;
  }
  render() {
    this.container.insertAdjacentHTML("beforeend", this.html());
  }
  mounted() {
    const closeButton = <HTMLInputElement>(
      document.querySelector("#sidebar-button-close")
    );
    const sidebar = <HTMLInputElement>document.querySelector("#sidebar");
    const mainContent = <HTMLInputElement>(
      document.querySelector("#main-content")
    );

    closeButton.addEventListener("click", () => {
      Utility.modifyClass("remove", mainContent, ["md:mr-96"]);
      Utility.modifyClass("remove", sidebar, ["translate-x-0"]);

      Utility.modifyClass("add", sidebar, ["translate-x-full"]);
    });
  }
}
