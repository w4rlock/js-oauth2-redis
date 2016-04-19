var oauthserver = require('oauth2-server')
var RegisterApp = require('./registerApp');
var redisModel = require('./model');

module.exports = exports = function(app) {
	
	var OAuth2Server = oauthserver({
			model: redisModel
		, grants: ['password', 'refresh_token']
		, debug: true
	});

	OAuth2Server.register = function (req, res, next) {
			new RegisterApp(OAuth2Server, req, res, next);
	};
	
	app.oauth = OAuth2Server;
}


