var fs = require('fs')
var path = require('path')
var css = fs.readFileSync(path.join(__dirname, 'index.css')).toString()

module.exports = function layout(body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>microblawg</title>
    <meta name=viewport content=initial-scale=1,maximum-scale=1>
    <style>${css}</style>
  </head>
  <body>${body}</body>
  </html>
  `
}
