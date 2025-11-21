let accessToken: string | null = null;
let tokenExpires: number | null = null;

export function setAccessToken(token: string | null, expires?: number | null) {
  accessToken = token;
  tokenExpires = typeof expires === "number" ? expires : expires ?? null;
}

export function getAccessToken() {
  return accessToken;
}

export function getTokenExpiry() {
  return tokenExpires;
}
