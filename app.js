var express = require('express');
var port = process.env.PORT || 3000;
var passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

var app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.use('apple', new OAuth2Strategy({
    authorizationURL: 'https://appleid.apple.com/auth/authorize',
    tokenURL: 'https://appleid.apple.com/auth/token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK
  },
  function(accessToken, refreshToken, payload, profile, done) {
    console.log(payload);
    done(null, { profile, payload });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/apple', passport.authenticate('apple'));

app.get('/auth/apple/callback',
  passport.authenticate('apple', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/', function (req, res) {
  console.log('User', req.user)
 res.send(JSON.stringify({ Hello: 'World'}));
});

app.listen(port, function () {
 console.log(`Apple Login POC listening on port ${port}!`);
});