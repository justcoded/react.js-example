module.exports = class DeviceTransportRepository {
  static get deviceToSocketMap() {
    if (!DeviceTransportRepository._deviceToSocketMap) {
      DeviceTransportRepository._deviceToSocketMap = {};
    }

    return DeviceTransportRepository._deviceToSocketMap;
  }

  static set transport(transport) {
    if (this._transport) {
      throw new Error('Transport is already set');
    }

    this._transport = transport;
  }

  static get deviceIds() {
    return Object.keys(DeviceTransportRepository.deviceToSocketMap);
  }

  static setDeviceToSocketMapping(deviceId, socket) {
    if (!deviceId) {
      throw new Error('Device id is empty');
    }

    DeviceTransportRepository.deviceToSocketMap[deviceId] = socket;
  }

  static clearDeviceToSocketMapping(deviceId) {
    if (deviceId) {
      delete DeviceTransportRepository.deviceToSocketMap[deviceId];
    }
  }

  static send(deviceId, message, data) {
    const socket = DeviceTransportRepository.deviceToSocketMap[deviceId];

    if (!socket) {
      throw new Error(`There are no device registered with such deviceId: ${deviceId}`);
    }

    socket.emit(message, data);
  }
};