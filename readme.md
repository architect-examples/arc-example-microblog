prereqs

- Setup an `.arc` project by following the [Quickstart](https://arc.codes/quickstart)
- Register an app with Github and make note of the Client ID and the Client Secret

## 01. Create an `.arc` file

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

And run `npm run create` to get a `staging` and `production` deployment sketched in.

## Provision
