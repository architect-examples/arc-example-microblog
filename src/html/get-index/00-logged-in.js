var data = require('@architect/arc-example-microblog-data')
var tmpl = require('@architect/arc-example-microblog-theme')
var post = require('@architect/arc-example-microblog-theme/post')
var postForm = require('@architect/arc-example-microblog-theme/post-form')
var addPermalink = require('./_add-permalink')

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
        var layout = tmpl.bind({}, req)
        var link = addPermalink.bind({}, req)
        var body = postForm({
          url: req._url('/posts'),
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
