const express = require('express');
const router = express.Router();

const GoogleOAuthHelper = require('../helpers/google-oauth');
const AdminAuthorizationClientRepository = require('../repositories/admin-authorization-client');

router.get('/setup', (req, res) => {
  const deviceId = req.header('deviceId');
  const client = AdminAuthorizationClientRepository.get(deviceId);

  if (client) {
    return res.json({
      status: 'already logged in'
    });
  }

  const OAuthClient = GoogleOAuthHelper.getSystemClient();
  AdminAuthorizationClientRepository.save(deviceId, OAuthClient);

  const url = GoogleOAuthHelper.generateAuthUrl(OAuthClient);

  res.json({
    status: 'ok',
    url: url
  })
});

router.post('/setup', (req, res) => {
  const deviceId = req.body.deviceId;
  const client = AdminAuthorizationClientRepository.get(deviceId);
  if (!client) {
    res.status(401);
    return res.json({
      scope: 'admin',
      error: 'authorization failed'
    })
  }
  GoogleOAuthHelper.getToken(client, req.body.token, function (err, data) {
    if (err) {
      res.status(401);
      return res.json({
        scope: 'user',
        error: 'Invalid access code'
      });
    }

    client.setCredentials({
      refresh_token: data['refresh_token']
    });

    res.json({
      status: 'ok',
    })
  });
});

module.exports = function () {
  this.use('/', router);
};