var data = require('@architect/arc-example-microblog-data')
var layout = require('@architect/arc-example-microblog-theme')
var post = require('@architect/arc-example-microblog-theme/post')
var addPermalink = require('./_add-permalink')

module.exports = function home(req, res) {
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
      var body = `
        <a href=${req._url('/login')}>login</a>
        ${results.Items.map(link).map(post).join('')}
      `
      res({
        html: layout(body)
      })
    }
  })
}
