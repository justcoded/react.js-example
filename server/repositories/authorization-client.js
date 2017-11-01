const googleOAuthConfigs = require('../configs/google-oauth');

module.exports = class AuthorizationClientRepository {
  static get clients() {
    if (!AuthorizationClientRepository._clients) {
      AuthorizationClientRepository._clients = {};
    }

    return AuthorizationClientRepository._clients;
  }

  static save(deviceId, client, onRemoveCb) {
    const id = Object.keys(AuthorizationClientRepository.clients).length;
    const devId = deviceId;
    AuthorizationClientRepository.clients[devId] = client;

    const removeTimeout = setTimeout(() => {
      if (AuthorizationClientRepository.get(devId)) {
        AuthorizationClientRepository.get(devId).revokeToken();
        AuthorizationClientRepository.remove(devId);
      }
      clearTimeout(removeTimeout);
      if (onRemoveCb) {
        onRemoveCb();
      }
    }, googleOAuthConfigs.clientClientLifetime);

    return id;
  }

  static remove(deviceId) {
    delete AuthorizationClientRepository.clients[deviceId];
  }

  static get(deviceId) {
    return AuthorizationClientRepository.clients[deviceId];
  }
};