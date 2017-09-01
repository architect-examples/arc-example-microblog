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
  authorID *String
  postID **String
