var assert = require('@smallwins/validate/assert')
var tiny = require('tiny-json-http')

module.exports = function _auth(params, callback) {
  assert(params, {
    clientID: String,
    clientSecret: String,
    code: String
  })
  tiny.post({
    url: 'https://github.com/login/oauth/access_token',
    headers: {
      Accept: 'application/json'
    },
    data: {
      client_id: params.clientID,
      client_secret: params.clientSecret,
      code: params.code
    }
  },
  function _post(err, result) {
    if (err) {
      callback(err)
    }
    else {
      callback(null, result.body.access_token)
    }
  })
}
