var arc = require('@architect/functions')

function route(req, res) {
  res({
    session: {},
    location: `/`
  })
}

exports.handler = arc.html.post(route)
