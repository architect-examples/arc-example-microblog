var fs = require('fs')
var path = require('path')
var link = require('./link')
var css = fs.readFileSync(path.join(__dirname, 'index.css')).toString()

module.exports = function layout(req, body) {
  var login = req.path === '/login'? '' : link()
  var logout = `
    <form class=logout-form action=${req._url('/logout')} method=post>
      <button>logout</button>
    </form>
  `
  var header = req.session.isLoggedIn? logout : login
  return `
  <!doctype html>
  <html>
  <head>
    <title>microblawg</title>
    <meta name=viewport content=initial-scale=1,maximum-scale=1>
    <style>${css}</style>
  </head>
  <body>${header}${body}</body>
  </html>
  `
}
