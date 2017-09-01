var arc = require('@architect/functions')
var layout = require('@architect/arc-example-microblog-theme')
var auth = require('./auth')

function route(req, res) {
  var url = 'https://github.com/login/oauth/authorize'
  var scope = 'user:email'
  var link = `
    <a href=${url}?scope=${scope}&client_id=${process.env.GITHUB_CLIENT_ID}>Login with Github</a>
  `
  res({
    html: layout(link)
  })
}

exports.handler = arc.html.get(auth, route)
