const express = require('express');
const router = express.Router();

const GoogleOAuthHelper = require('../helpers/google-oauth');
const DeviceTransportRepository = require('../repositories/device-transport');
const AuthorizationClientRepository = require('../repositories/authorization-client');
const socketServerConfigs = require('../configs/socket-server');
const googleOAuthConfigs = require('../configs/google-oauth');

router.get('/authorization/request/:deviceId/:stateCode', (req, res) => {
  const redirectUrl = `${req.protocol}://${req.get('host')}/authorization/success?redirectUrl=${req.query.redirectUrl}`;

  const OAuthClient = GoogleOAuthHelper.getWebClient(redirectUrl);

  const params = {
    deviceId: req.params.deviceId,
    stateCode: req.params.stateCode
  };

  AuthorizationClientRepository.save(req.params.deviceId, OAuthClient);

  res.redirect(GoogleOAuthHelper.generateAuthUrl(OAuthClient, params, true));
});

router.get('/authorization/success/', (req, res) => {
  const state = JSON.parse(decodeURIComponent(req.query.state));
  const OAuthClient = AuthorizationClientRepository.get(state.deviceId);

  if (!OAuthClient) {
    return res.redirect(`${req.query.redirectUrl}?error=Authorization request is expire`);
  }

  GoogleOAuthHelper.getToken(OAuthClient, req.query.code, (err, data) => {
    if (err) {
      return res.redirect(`${req.query.redirectUrl}?error=${err}`);
    }

    OAuthClient.setCredentials({
      access_token: data['access_token']
    });

    AuthorizationClientRepository.save(state.deviceId, OAuthClient, () => {
      DeviceTransportRepository.send(state.deviceId, socketServerConfigs.deviceAuthStatusChangeEventCode, {
        status: false
      });
    });

    DeviceTransportRepository.send(state.deviceId, socketServerConfigs.deviceStateChangeEventCode, {
      state: state.stateCode,
      payload: {
        expireAt: Date.now() + googleOAuthConfigs.clientClientLifetime
      }
    });

    DeviceTransportRepository.send(state.deviceId, socketServerConfigs.deviceAuthStatusChangeEventCode, {
      status: true
    });

    if (req.query.redirectUrl) {
      res.redirect(req.query.redirectUrl);
    } else {
      res.json({status: 'ok'});
    }
  });
});

module.exports = function () {
  this.use('/', router);
};
