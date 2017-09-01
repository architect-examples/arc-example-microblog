module.exports = function addPermalink(req, p) {
  if (req.headers.Host) {
    p.permalink = `${req.headers.Host}/posts/${p.postID}`
  }
  else {
    p.permalink = req._url(`/posts/${p.postID}`)
  }
  return p
}
