'use strict';

let oauthserver = require('oauth2-server')
	, RegisterApp = require('./registerApp')
	, RegisterUser = require('./registerUser')
	, model = require('./model')
;

module.exports = exports = (app) => {
	
	let OAuth2Server = oauthserver({
				model: model
			, grants: ['password', 'refresh_token']
			, debug: true
			, accessTokenLifetime: global.cfg.APP.ACCESS_TOKEN_EXPIRE
			, refreshTokenLifetime: global.cfg.APP.REFRESH_TOKEN_EXPIRE
	});



	OAuth2Server.register = (req, res, next) => {
			console.log(JSON.stringify(req.body));
			new RegisterApp(OAuth2Server, req, res, next);
	};



	OAuth2Server.signup = (req, res, next) => {
			new RegisterUser(OAuth2Server, req, res, next);
	};
	



	OAuth2Server.userApps = (req, res, next) => {
			model.getUserApps(req.user)
			.then((dat) => res.json(dat))
			.catch((err) => {
				res.status(500).json({ err: err});
				console.error(err);
			});
	}



	OAuth2Server.delApp = (req, res, next) => {
			model.removeApp(req.user, req.params.id_client)
			.then(
				(code) => { res.status(200).end() },
				 (err) => { res.status(500).json({ err: err }); 
			})
	}
	

	//SET DEFAULT REDIS DATA
	model.saveUser(global.cfg.APP.REDIS_USER).then((id_usr) => {
		return model.saveApp(global.cfg.APP.REDIS_APP, { id: id_usr });
	})
	.catch((err) => {
		//console.error(err);
	});


	app.oauth = OAuth2Server;
}


