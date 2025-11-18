export function createRefreshCookie(refreshToken: string) {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    return `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; SameSite=Lax; Domain=.ventarca.biz; Max-Age=${
      60 * 60 * 24 * 30
    }`;
  }

  return `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${
    60 * 60 * 24 * 30
  }`;
}

export function clearRefreshCookie() {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    return `refreshToken=deleted; HttpOnly; Secure; Path=/; SameSite=Lax; Domain=.ventarca.biz; Max-Age=0`;
  }

  return `refreshToken=deleted; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}
