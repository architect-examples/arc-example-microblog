var data = require('@architect/arc-example-microblog-data')
var layout = require('@architect/arc-example-microblog-theme')
var post = require('@architect/arc-example-microblog-theme/post')
//require('./_post')
var addPermalink = require('./_add-permalink')
var postForm = require('./_post-form')

module.exports = function auth(req, res, next) {
  if (req.session.isLoggedIn) {
    data.posts.query({
      KeyConditionExpression: 'authorID = :authorID',
      ExpressionAttributeValues: {
        ':authorID': process.env.GITHUB_LOGIN,
      }
    },
    function _query(err, results) {
      if (err) {
        res(err)
      }
      else {
        var link = addPermalink.bind({}, req)
        var body = postForm({
          logoutUrl: req._url('/logout'),
          postsUrl: req._url('/posts'),
          avatar: req.session.account.avatar,
          name: req.session.account.name,
        })
        body += results.Items.map(link).map(post).join('')
        res({
          html: layout(body)
        })
      }
    })
  }
  else {
    next()
  }
}
