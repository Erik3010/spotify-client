class SpotifyService {
  clientId: string = CONFIG.CLIENT_ID;
  clientSecret: string = CONFIG.CLIENT_SECRET;
  token: string | null = null;
  limit: number = 10;

  async init() {
    const localToken = localStorage.getItem(CONFIG.TOKEN_LOCAL_KEY);

    if (!!localToken) this.token = localToken;
    else {
      this.token = (await this.getToken()).access_token;
      this._cacheToken();
    }
  }

  _getAuthorizationHeader() {
    return btoa(`${this.clientId}:${this.clientSecret}`);
  }

  _getBearerTokenHeader() {
    return {
      Authorization: `Bearer ${this.token}`,
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
    localStorage.setItem(CONFIG.TOKEN_LOCAL_KEY, this.token!);
  }
}
