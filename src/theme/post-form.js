var assert = require('@smallwins/validate/assert')

module.exports = function _postForm(params) {
  assert(params, {
    url: String,
    avatar: String,
    name: String
  })
  return `
    <a class="p-author h-card author-icon" rel=author title="${params.name}">
      <img src="${params.avatar}" alt="${params.name}"> ${params.name}
    </a>

    <form class=post-form action=${params.url} method=post>
      <textarea name=body></textarea>
      <button>Post</button>
    </form>
  `
}
