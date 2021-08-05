class SpotifyService {
  clientId: string = CONFIG.CLIENT_ID;
  clientSecret: string = CONFIG.CLIENT_SECRET;
  token!: SpotifyTokenResponse;
  limit: number = 10;

  async init() {
    this.token =
      JSON.parse(localStorage.getItem(CONFIG.SPOTIFY_AUTH_TOKEN)!) || {};

    if (
      !this.token?.access_token ||
      Date.now() > (this.token?.expired_at! ?? 0)
    ) {
      const tokenResult = await this.getToken();

      this.token = tokenResult;

      this._cacheToken();
    }
  }

  _getAuthorizationHeader() {
    return btoa(`${this.clientId}:${this.clientSecret}`);
  }

  _getBearerTokenHeader() {
    return {
      Authorization: `Bearer ${this.token?.access_token}`,
    };
  }

  async getToken(): Promise<SpotifyTokenResponse> {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${this._getAuthorizationHeader()}`,
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();

    return data;
  }

  async getNewRelease(page: number = 1): Promise<NewReleaseAlbumResponse> {
    const offset = (page - 1) * this.limit;

    const result = await fetch(
      `${CONFIG.API_BASE_URL}/browse/new-releases?offset=${offset}&limit=${this.limit}`,
      {
        method: "GET",
        headers: this._getBearerTokenHeader(),
      }
    );

    const data = await result.json();

    return data;
  }

  async searchAlbum({
    query,
  }: {
    query: string;
  }): Promise<NewReleaseAlbumResponse> {
    const params = new URLSearchParams({
      query,
      type: "album",
    }).toString();

    const result = await fetch(`${CONFIG.API_BASE_URL}/search?${params}`, {
      method: "GET",
      headers: this._getBearerTokenHeader(),
    });

    const data = await result.json();

    return data;
  }

  _cacheToken() {
    localStorage.setItem(
      CONFIG.SPOTIFY_AUTH_TOKEN,
      JSON.stringify({
        ...this.token,
        expired_at: Date.now() + this.token.expires_in * 1000,
      })
    );
  }
}
