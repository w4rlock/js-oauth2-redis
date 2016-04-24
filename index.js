'use strict';

let express = require('express')
	, ratelimit = require('express-rate-limit')
  , bodyParser = require('body-parser')
	, app = express()
	, conf  = require('./config')(app.env)
;

require('./lib/oauth2plus')(app);

//gzip
app.use(require('compression')());

//security http header
app.use(require('helmet')());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//authentication is required
app.use('/app', app.oauth.authorise());

app.use('/oauth/token', ratelimit({
		max: 5,
		windowMs: 1000 * 30,
		handler: (req, res) => {
			//store possible hacker info in log db ?
			console.log('Banned: ' + req.ip);
			res.status(429).json({ message: 'to many request' });
		}
}));

app.post('/usr/signup', app.oauth.signup);

app.route('/app')
	 .get(app.oauth.userApps)
	 .post(app.oauth.register);

app.delete('/app/:id_client', app.oauth.delApp);


// Handle token grant requests
app.all('/oauth/token', app.oauth.grant());
app.post('/oauth/validate', app.oauth.authorise(), (req, res) => {
  res.json(req.user);
});


// Error handling
app.use(app.oauth.errorHandler());

app.listen(conf.APP.PORT, () => {
	console.log(`[*] Server Listing on port ${conf.APP.PORT}`);
});
