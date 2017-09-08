module.exports = function link(req, res) {
  var url = 'https://github.com/login/oauth/authorize'
  var scope = 'user:email'
  var clientID = process.env.GITHUB_CLIENT_ID
  return `
    <a class=login-anchor href=${url}?scope=${scope}&client_id=${clientID}>login</a>
  `
}
