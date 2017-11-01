module.exports = {
  clientId: process.env.GOOGLE_OAUTH_SERVER_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_SERVER_CLIENT_SECRET,
  webClientId: process.env.GOOGLE_OAUTH_WEB_CLIENT_ID,
  webClientSecret: process.env.GOOGLE_OAUTH_WEB_CLIENT_SECRET,
  systemClientRefreshToken: process.env.GOOGLE_OAUTH_SYSTEM_REFRESH_TOKEN,
  systemRedirectUrl: process.env.GOOGLE_OAUTH_SYSTEM_REDIRECT_URL,
  clientClientLifetime: parseInt(process.env.GOOGLE_OAUTH_CLIENT_LIFETIME),
  clientRedirectUrl: process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URL
};