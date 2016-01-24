var express = require('express'),
  bodyParser = require('body-parser'),
  oauthserver = require('oauth2-server')

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = oauthserver({
  model: require('./model'),
  grants: ['password', 'refresh_token'],
  debug: true
});

// Handle token grant requests
app.all('/oauth/token', app.oauth.grant());

app.get('/secret', app.oauth.authorise(), (req, res) => {
  // Will require a valid access_token
  res.send('Secret area');
});

app.get('/public', (req, res) => {
  // Does not require an access_token
  res.send('Public area');
});

// Error handling
app.use(app.oauth.errorHandler());

app.listen(3000, () => {
    console.log('[*] Server Listing on port %d', '3000');
});
