const io = require('socket.io');

const socketServerConfigs = require('../configs/socket-server');
const DeviceTransportRepository = require('../repositories/device-transport');

module.exports = function () {
  this._io = io.listen(this._server);

  this._io.on('connection', (socket) => {
      let deviceId;

      socket.on(socketServerConfigs.deviceRegistrationEventCode, (data) => {
        deviceId = data.deviceId;

        DeviceTransportRepository.setDeviceToSocketMapping(deviceId, socket);
      });

      socket.on(socketServerConfigs.deviceRefreshEventCode, (data) => {
        deviceId = data.deviceId;

        DeviceTransportRepository.setDeviceToSocketMapping(deviceId, socket);
      });

      socket.on('disconnect', () => {
        DeviceTransportRepository.clearDeviceToSocketMapping(deviceId);
      });
    });
  DeviceTransportRepository.transport = this._io;
};