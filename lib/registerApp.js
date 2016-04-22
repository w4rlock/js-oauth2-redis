var error = require('./error')
  , runner = require('./runner')
	;

module.exports = RegisterApp;

var fns = [
  checkParams,
  saveClient
];

function RegisterApp (config, req, res, next) {
  this.config = config;
  this.model = config.model;
  this.req = req;
  this.res = res;


  runner(fns, this, next);
}


function checkParams (done) {
	var body = this.req.body;
	var query = this.req.query;


	if (!body && !query){
	 	return done(error('invalid_request'));
	}

	console.log(JSON.stringify(body));
	this.name = body.name || query.name;
	if (!this.name){
		return done(error('invalid_request', 'Invalid or missing "name" param'));
	} 

	this.description = body.description || query.description;
	if (!this.description){
		return done(error('invalid_request', 'Invalid or missing "description" param'));
	} 


	this.platform = body.platform || query.platform;
	this.redirectURL = body.redirectURL || query.redirectURL;
	if (!this.platform || this.platform.length < 1){
		return done(error('invalid_request', 'Invalid or missing "platform" param'));
	} 
	else if (this.platform.indexOf('web') > -1){
		if (!this.redirectURL){
			return done(error('invalid_request', 'Invalid or missing "redirectURL" param'));
		}
		else{
			this.redirectURL = '';
		}
	}

	done();
}



function saveClient(done) {
	var err_exist = this.model.ERR_APP_EXIST;
	var response = this.res;

	var client = {
			name: this.name
		, descr: this.description
		, platform: this.platform
		, redirectURL: this.redirectURL || ''
	};

	this.model.saveApp(client, this.req.user)
		.then((creds) => {

			response.json({ authcode: creds.authorization });
			done();

		})
		.catch((err) => {
			if (err == err_exist){
				return done(error('invalid_request', err));
			}
			return done(error('server_error', false, err));
		});
	
}
