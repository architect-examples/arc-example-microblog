var assert = require('@smallwins/validate/assert')
var tiny = require('tiny-json-http')

module.exports = function _account(params, callback) {
  assert(params, {
    token: String
  })
  tiny.get({
    url: 'https://api.github.com/user',
    headers: {
      Accept: 'application/json'
    },
    data: {
      access_token: params.token
    }
  },
  function _get(err, result) {
    if (err) {
      callback(err)
    }
    else if (result.body.login != process.env.GITHUB_LOGIN) {
      var e = Error('invalid_github')
      e.code = 403
      callback(e)
    }
    else {
      callback(null, {
        token: params.token, 
        isLoggedIn: true, 
        account: {
          name: result.body.name, 
          login: result.body.login, 
          avatar: result.body.avatar_url
        }
      })
    }
  })
}
