var arc = require('@architect/functions')
var loggedIn = require('./00-logged-in')
var loggedOut = require('./01-logged-out')

exports.handler = arc.html.get(loggedIn, loggedOut)
