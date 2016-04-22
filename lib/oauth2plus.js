'use strict';

var oauthserver = require('oauth2-server')
var RegisterApp = require('./registerApp');
var RegisterUser = require('./registerUser');
var querystring = require('querystring');
var model = require('./model');

module.exports = exports = (app) => {
	
	let OAuth2Server = oauthserver({
			model: model
		, grants: ['password', 'refresh_token']
		, debug: true
	});

	OAuth2Server.register = (req, res, next) => {
			console.log(JSON.stringify(req.body));
			console.log(JSON.stringify(req.user));
			new RegisterApp(OAuth2Server, req, res, next);
	};


	OAuth2Server.signup = (req, res, next) => {
			new RegisterUser(OAuth2Server, req, res, next);
	};
	

	OAuth2Server.userApps = (req, res, next) => {
			model.getUserApps(req.user)
			.then((data) => {
				console.log(JSON.stringify(data));
				res.json(data);
			})
			.catch(console.error);
	}
	











	
	//check initial data 
	model.saveUser({
			name: 'developer'
		, email: 'developer@rockboxstudios.com'
		, password:'_d3v310p3r_'
	})

	.then((id_usr) => {
		return model.saveApp({
				name: 'rockbox-oauth2-server'
			, description: 'oauth2 server'
			, platform: ['mobile']
			}, 
			{ id: id_usr 
			});
	})

	.catch((err) => {
		console.error(err);
	});

	app.oauth = OAuth2Server;
}


