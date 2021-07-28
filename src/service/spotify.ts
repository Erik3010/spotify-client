class SpotifyService {
  clientId: string;
  clientSecret: string;
  token: string | null = null;
  limit: number = 10;

  constructor({ clientId, clientSecret }: SpotifyInterface) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

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
