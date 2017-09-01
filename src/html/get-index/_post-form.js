var assert = require('@smallwins/validate/assert')

module.exports = function _postForm(params) {
  assert(params, {
    logoutUrl: String,
    postsUrl: String,
    avatar: String,
    name: String
  })
  return `
    <form action=${params.logoutUrl} method=post>
      <button>Logout</button>
    </form>

    <a class="p-author h-card author-icon" rel=author title="${params.name}">
      <img src="${params.avatar}" alt="${params.name}"> ${params.name}
    </a>

    <form action=${params.postsUrl} method=post>
      <textarea name=body></textarea>
      <button>Post</button>
    </form>
  `
}
