class SpotifyService {
  clientId: string;
  clientSecret: string;
  token: string | null = null;

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

  async getNewRelease(): Promise<NewReleaseAlbumResponse> {
    const result = await fetch(
      "https://api.spotify.com/v1/browse/new-releases",
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
