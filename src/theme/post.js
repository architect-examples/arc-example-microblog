/**
 * "authorID": "brianleroux",
   "postID": "q7167XlYr",
    "author": "Brian LeRoux",
    "body": "asdfasdf 🥐\r\n",
    "avatar": "https://avatars3.githubusercontent.com/u/990?v=4",
    "created"
*/
module.exports = function _post(post) {
  return `
  <section>
    <!-- author -->
    <a class="p-author h-card author-icon" rel=author title="${post.author}">
      <img src="${post.avatar}" alt="${post.author}"> ${post.author}
    </a>

    <!-- entry -->
    <p class="p-name entry-title e-content entry-content article">${post.body}</p>

    <!-- published -->
    <span class="info footer">
      <span class="dt-published published dt-updated updated">
        <time class="value" datetime="${post.created}">
          <a href=${post.permalink}>⚓ ${post.created}</a>
        </time>  
      </span>  
    </span>

  </section>  
  `
}


        


