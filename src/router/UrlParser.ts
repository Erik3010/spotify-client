class UrlParser {
  static getCurrentHash() {
    return window.location.hash.substring(1);
  }
  static getCurrentRouteMeta() {
    const [page, id] = UrlParser.getCurrentHash().split("/");

    return {
      page,
      id,
    };
  }
  static getCurrentRoutePath() {
    const { page, id } = UrlParser.getCurrentRouteMeta();

    return page != null ? `/${page}` : "/" + id != null ? "/:id" : "";
  }
}
