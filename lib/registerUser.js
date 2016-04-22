var error = require('./error')
  , runner = require('./runner')
	;

module.exports = RegisterApp;

var fns = [
  checkParams,
  saveUser
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

	this.name = body.name || query.name;
	if (!this.name){
		return done(error('invalid_request', 'Invalid or missing "name" param'));
	} 

	this.email = body.email || query.email;
	if (!this.email){
		return done(error('invalid_request', 'Invalid or missing "email" param'));
	} 

	this.password = body.password || query.password;
	if (!this.password){
		return done(error('invalid_request', 'Invalid or missing "password" param'));
	} 

	done();
}



function saveUser(done) {
	var err_exist = this.model.ERR_USR_EXIST;
	var response = this.res;

	var usr = {
			name: this.name
		, email: this.email
		, password: this.password
	};

	this.model.saveUser(usr)
			.then(id_usr => {
				response.json({ id: id_usr });
				done();
			
			})
			.catch((err) => {
					if (err == err_exist){
						return done(error('invalid_request', err));
					}
					return done(error('server_error', false, err));

				});
	
	
}
