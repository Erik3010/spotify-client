class SpotifyService {
  clientId: string = "b6fec45e2e674f43a79579a66f57d262";
  clientSecret: string = "570e51197e5644e0ac042dd0f2ed3f1a";
  token: string | null = null;
  limit: number = 10;

  async init() {
    this.token = (await this.getToken()).access_token;
  }

  _getAuthorizationHeader() {
    return btoa(`${this.clientId}:${this.clientSecret}`);
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
      `https://api.spotify.com/v1/browse/new-releases?offset=${offset}&limit=${this.limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    const data = await result.json();

    return data;
  }
}
