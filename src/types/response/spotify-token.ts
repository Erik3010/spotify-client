interface SpotifyTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  expired_at?: number;
}
