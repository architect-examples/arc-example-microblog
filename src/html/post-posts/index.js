var arc = require('@architect/functions')
var data = require('@architect/arc-example-microblog-data')
var hashids = require('hashids')

function protect(req, res, next) {
  if (req.session.isLoggedIn) {
    next()
  }
  else {
    res({
      location: req._url('/login')
    })
  }
}

function create(req, res) {
  data.posts.put({
    authorID: req.session.account.login,
    postID: (new hashids()).encode(Date.now()),
    author: req.session.account.name,
    body: req.body.body,
    avatar: req.session.account.avatar,
    created: (new Date(Date.now())).toISOString(),
  },
  function _put(err, result) {
    if (err) {
      res(err)
    }
    else {
      res({
        location: req._url('/')
      })
    }
  })
}

exports.handler = arc.html.post(protect, create)
