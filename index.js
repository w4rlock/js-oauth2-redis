var express = require('express')
  , bodyParser = require('body-parser')
	, app = express();

require('./lib/oauth2plus')(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Handle token grant requests
app.all('/oauth/token', app.oauth.grant());
app.post('/app/register', app.oauth.register);

app.post('/oauth/validate', app.oauth.authorise(), function(req, res) {
  res.json(req.user);
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
