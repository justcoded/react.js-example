module.exports = class AdminAuthorizationClientRepository {
  static get clients() {
    if (!AdminAuthorizationClientRepository._clients) {
      AdminAuthorizationClientRepository._clients = {};
    }

    return AdminAuthorizationClientRepository._clients;
  }

  static save(deviceId, client) {
    AdminAuthorizationClientRepository.clients[deviceId] = client;
  }

  static get(deviceId) {
    return AdminAuthorizationClientRepository.clients[deviceId];
  }
};
