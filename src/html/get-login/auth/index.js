var waterfall = require('run-waterfall')
var authGithub = require('./00-auth-github-account')
var getGithub = require('./01-get-github-account')

module.exports = function auth(req, res, next) {

  if (req.session.isLoggedIn) {
    res({
      location: `/`
    })
  }
  else if (req.query.code) {

    var clientID = process.env.GITHUB_CLIENT_ID
    var clientSecret = process.env.GITHUB_CLIENT_SECRET
    var code = req.query.code

    waterfall([
      function _auth(callback) {
        authGithub({
          clientID, 
          clientSecret, 
          code
        }, callback) 
      },
      function _account(token, callback) {
        getGithub({
          token
        }, callback)
      }
    ],
    function _done(err, account) {
      if (err && err.code === 403) {
        res({
          location:'/'
        })
      }
      else if (err) {
        res(err)
      }
      else {
        res({
          session: account,
          location: '/'
        })
      }
    })

  }
  else {
    next()
  }
}
