var arc = require('@architect/functions')

function route(req, res) {
  res({
    html: `
      <html>
      <head>
        <title></title>
      </head>
      <body>
      <p>Well, hello there!</p>
      <p>We're going to now talk to the GitHub API. Ready?
      <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GITHUB_CLIENT_ID}">Click here</a> to begin!</a>
      </p>
      </body>
     </html>
    `
  })
}

exports.handler = arc.html.get(route)
