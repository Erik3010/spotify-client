class Utility {
  static dateFormat(date: string) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(date));
  }
  static modifyClass(
    action: "add" | "remove",
    element: HTMLElement,
    classes: string[]
  ) {
    classes.forEach((cls) => element.classList[action](cls));
  }
}
