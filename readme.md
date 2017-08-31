## Prereqs

- Ensure you have AWS credentials setup
- Register an app with Github and make note of the Client ID and the Client Secret; use http://localhost:3333/login for the redirect url

## 01. Create an `.arc` Project

```bash
mkdir microblog
cd microblog
npm init --yes
npm i @architect/workflows --save
```

And touch a `.arc` file with the following contents:

```
@app
microblog

@html
get / # displays posts and post form if logged in
get /posts/:postID # permalink to display a post
get /login # log in with github (requires lambdas have GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET env vars on the Lambda in the AWS Console)
post /logout # logout
post /posts # create a post

@tables
posts
  postID *String
```

Add the following to your `package.json`:

```javascript
{
  "scripts": {
    "create": "AWS_PROFILE=personal AWS_REGION=us-east-1 arc-create",
    "deploy": "AWS_PROFILE=personal AWS_REGION=us-east-1 arc-deploy",
    "start": "NODE_ENV=testing AWS_PROFILE=personal AWS_REGION=us-east-1 arc-sandbox",
    "dns": "AWS_PROFILE=personal AWS_REGION=us-east-1 arc-dns"
  },
}
```  

And run `npm run create` to get a `staging` and `production` deployment sketched in.

## 02. Setup `/login`

Add the following to `./src/html/get-login/index.js`:

```javascript
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
```

And login to the AWS Console to add the environment variables `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to:

- `microblog-staging-get-login`
- `microblog-production-get-login`

To load env variables locally touch `.arc-env` in the root of your project and add the following:

```
# .arc-env
@testing
GITHUB_CLIENT_ID your-id-here
GITHUB_CLIENT_SECRET your-secret-here
```
Start the local development server by running `npm run create`. This will get tedius however.

## 03. Add `nodemon`

Lets get this thing restarting automatically when we make changes.

```bash
npm i nodemon --save-dev
```

Add the following to `package.json`:

```javascript
{
  "scripts": {
    "start": "nodemon --watch src -e js --exec NODE_ENV=testing AWS_PROFILE=personal AWS_REGION=us-east-1 arc-sandbox",
  }
}
```

Now running `npm start` will be restart when any changes are made to `.js` files in `./src`.


## 04. Perform the oAuth Dance with Grace
