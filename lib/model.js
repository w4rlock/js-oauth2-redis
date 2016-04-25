var model = module.exports
	, md5 = require('md5')
  , Redis = require('ioredis')
	;

const db = new Redis();


const keys = {
		//app:client_id
		app: (a) => `app:${a}`
	, usrapps: (u) => `usr:apps:${u}`

  , token: (a) => `token:${a}`
  , refreshToken: (a) => `retoken:${a}`
  , grantTypes: (a) => `grant:${a}:grant_types`

		//usr:id
  , usr: (a) => `usr:${a}`

		//hsets
  , apps: 'apps'
  , users: 'users'

	, id_usr: 'next:id:usr'
	, id_app: 'next:id:app'
};



model.ERR_APP_EXIST = 'ERR_APP_EXIST';
model.ERR_USR_EXIST = 'ERR_USR_EXIST';


model.getAccessToken = function (bearerToken, callback) {
	var k = keys.token(bearerToken);

  db.hgetall(k, (err, token) => {
    if (err) return callback(err);
    if (!token || !token.accessToken) return callback(null);

		model.getUserById(token.userId, (err, usr) => {
			callback(null, {
					accessToken: token.accessToken
				, clientId: token.clientId
				, expires: token.expires ? new Date(token.expires) : null
				, user: usr
			});
		});
  });
};




model.getClient = function (clientId, clientSecret, callback) {
	var key = keys.app(clientId);

  db.hgetall(key, (err, client) => {
    if (err) return callback(err);
    if (!client || client.clientSecret !== clientSecret) return callback();

    callback(null, {
      clientId: client.clientId,
      clientSecret: client.clientSecret
    });
  });
};




model.getRefreshToken = function (bearerToken, callback) {
	var k = keys.refreshToken(bearerToken);

  db.hgetall(k, (err, token) => {
    if (err) return callback(err);
    if (!token) return callback();

    callback(null, {
      refreshToken: token.accessToken,
      clientId: token.clientId,
      expires: token.expires ? new Date(token.expires) : null,
      userId: token.userId
    });
  });
};



model.grantTypeAllowed = function (clientId, grantType, callback) {
	var k = keys.grantTypes(clientId);
  db.sismember(k, grantType, callback);
};



model.saveAccessToken = function (accessToken, clientId, expires, user, callback) {
  var k = keys.token(accessToken);
	var o = {
				accessToken: accessToken
			, clientId: clientId
			, expires: expires ? expires.toISOString() : null
			, userId: user.id
	}

	db.multi()
		.hmset(k ,o)
		.expire(k, global.cfg.APP.ACCESS_TOKEN_EXPIRE)
		.exec(callback);
};



model.saveRefreshToken = function (refreshToken, clientId, expires, user, callback) {
  var k = keys.refreshToken(refreshToken);
	var o = {
				refreshToken: refreshToken
			, clientId: clientId
			, userId: user.id
	}

	db.multi()
		.hmset(k ,o)
		.expire(k, global.cfg.APP.REFRESH_TOKEN_EXPIRE)
		.exec(callback);
};



model.getUser = function (email, password, callback) {
	model.existUser(email).then((id_exist) => {
		if (id_exist){
			var k = keys.usr(id_exist);

			db.hgetall(k, (err, user) => {
				if (err) return callback(err);
				if (!user || md5(password) !== user.password) return callback();

				callback(null, user);
			});
		}
		else{
				callback(null);
		}

	});
};



model.getUserById = function(id, callback) {
	var k = keys.usr(id);

	db.hgetall(k, (err, user) => {
		if (err) return callback(err);
		callback(null, user);
	});
}




model.saveApp = function(app, usr){
	return new Promise((res, rej) => {
		var clientId = md5(app.name);
		var secretId = md5(app.name+clientId);

		var keyGrant = keys.grantTypes(clientId);
		var keyClient = keys.app(clientId, usr.id);


		model.existApp(app.name).then((exist) => {
			if (exist){
				throw new Error(model.ERR_APP_EXIST);
			}
			return model.incr(keys.id_app);


		})
		.then((id_app) => {
			var kapp = keys.apps;
			var kusrapp = keys.usrapps(usr.id);

			var b64 = new Buffer(clientId+':'+secretId).toString('base64');
			var o = {
						clientId: clientId
					, clientSecret: secretId
					, authorization: b64
					, name: app.name
					, descr: app.description
					, platform: app.platform
					, redirectURL: app.redirectURL
					, fcreation: new Date().valueOf()
			};

			db.multi()
				.hmset(keyClient, o)
				.hset(kapp, app.name, id_app) 
				.sadd(kusrapp, clientId)
				.sadd(keyGrant, [
						'password'
					, 'refresh_token'
				])

				.exec((errs) => {
					if (errs) throw new Error(errs);
					else{
						res({
								clientId: clientId
							, secretId: secretId
							, authorization: b64
						});
					}
				});
			
		})
		.catch(err => {
			rej(err.message);
		});

	})
}



model.saveUser = function(usr){
	return new Promise((res, rej) => {
		var pwd = md5(usr.password);
		
		model.existUser(usr.email).then((exist) => {
				if (exist){
					throw new Error(model.ERR_USR_EXIST);
				}
				return model.incr(keys.id_usr);
		 })
		 .then((id_usr) => {
				var k = keys.usr(id_usr);
				var o = {
							id: id_usr
						, name: usr.name
						, email: usr.email
						, password: md5(usr.password)
						, fcreation: new Date().valueOf()
				};

				db.multi()
					.hmset(k, o)
					.hset(keys.users, usr.email, id_usr) 
					.exec((errs) => {
						if (errs) throw new Error(errs);
						else res(id_usr);
					});
			
			})
			.catch(err => {
				rej(err.message);
			});
	});
}




model.existUser = (email) => {
	return new Promise((res, rej) => {
		var k = keys.users;

		db.hget(k, email, (err, count) => {
			if (err) rej(err);
			else res(count);
		});
	
	});
}



model.existApp = (name) => {
	return new Promise((res, rej) => {
		var k = keys.apps;

		db.hget(k, name, (err, count) => {
			if (err) rej(err);
			else res(count);
		});
	
	});
}



model.incr = (key, cb) => {
	return new Promise((res, rej) => {
		db.incr(key, (err, count) => {
			if (err) rej(err);
			else res(count);
		});
	});
}




model.getUserApps = (user) => {
	return new Promise((res, rej) => {
		var k = keys.usrapps(user.id);

		db.smembers(k, (err, apps) => {
			if (err) rej(err);
			else {

				MHGETALL(apps, 'app:', (err, data) => {
					if (err) rej(err);
					else res(data);
				});

			}
		});

	});

}



model.removeApp = (user, clientID) => {
	return new Promise((res, rej) => {
		var kua = keys.usrapps(user.id)
			, ka = keys.app(clientID)
			, kgt = keys.grantTypes(clientID);


		db.sismember(kua, clientID, (err, count) => {
			if (err) {
				rej(err);
			}
			else if (count == 0){
				rej('APP_NOT_FOUND');
			}
			else{
				db.multi()
					.srem(kua, clientID)
					.del(ka)
					.del(kgt)
					.exec((err) => {
						if (err) rej(err);
						else res(200);
					});
			}
		});
	});
}



function MHGETALL(keys, prefix, cb) {
	prefix = prefix || '';

	db.multi({pipeline: false});

	keys.forEach(function(key, index){
		db.hgetall(prefix+key);
	});

	db.exec((err, result) => {
		cb(err, result);
	});
}
