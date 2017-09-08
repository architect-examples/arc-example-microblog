@app
microblog

# NOTE
#
# This blog requires the following env vars:
#
# - GITHUB_CLIENT_ID
# - GITHUB_CLIENT_SECRET
# - GITHUB_LOGIN

@html
get /              # displays posts and form if logged in
get /posts/:postID # permalink to display a post
get /login         # log in with github  and  env vars on the Lambda in the AWS Console)
post /logout       # logout
post /posts        # create a post

@json
get /feed.json

@tables
posts
  authorID *String
  postID **String
