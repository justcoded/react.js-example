const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const googleOAuthConfigs = require('../configs/google-oauth');

module.exports = class GoogleOAuthHelper {
  static get SCOPES() {
    return ['https://www.googleapis.com/auth/calendar'];
  }

  static getWebClient(redirectUrl) {
    return new OAuth2(googleOAuthConfigs.webClientId, googleOAuthConfigs.webClientSecret, redirectUrl);
  }

  static getSystemClient() {
    return new OAuth2(googleOAuthConfigs.clientId, googleOAuthConfigs.clientSecret, googleOAuthConfigs.systemRedirectUrl);
  }

  static generateAuthUrl(client, params, isOnline = false) {
    const query = {
      access_type: isOnline ? 'online' : 'offline',
      scope: GoogleOAuthHelper.SCOPES
    };

    if (params) {
      query.state = encodeURIComponent(JSON.stringify(params));
    }

    return client.generateAuthUrl(query);
  }

  static getToken(client, accessCode, cb) {
    return client.getToken(accessCode, cb);
  }
};