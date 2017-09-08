var arc = require('@architect/functions')
var tmpl = require('@architect/arc-example-microblog-theme')
var link = require('@architect/arc-example-microblog-theme/link')
var auth = require('./auth')

function route(req, res) {
  var layout = tmpl.bind({}, req)
  res({
    html: layout(link())
  })
}

exports.handler = arc.html.get(auth, route)
