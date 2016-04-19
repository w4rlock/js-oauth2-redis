var model = module.exports,
	md5 = require('md5'),
  util = require('util'),
  redis = require('redis');

var db = redis.createClient();


var keys = {
  token: 'tokens:%s',
  client: 'clients:%s',
  refreshToken: 'refresh_tokens:%s',
  grantTypes: 'clients:%s:grant_types',
  user: 'users:%s'
};

model.getAccessToken = function (bearerToken, callback) {
  db.hgetall(util.format(keys.token, bearerToken), function (err, token) {
    if (err) return callback(err);

    if (!token) return callback();

    callback(null, {
      accessToken: token.accessToken,
      clientId: token.clientId,
      expires: token.expires ? new Date(token.expires) : null,
      userId: token.userId
    });
  });
};

model.getClient = function (clientId, clientSecret, callback) {
  db.hgetall(util.format(keys.client, clientId), function (err, client) {
    if (err) return callback(err);

    if (!client || client.clientSecret !== clientSecret) return callback();

    callback(null, {
      clientId: client.clientId,
      clientSecret: client.clientSecret
    });
  });
};

model.getRefreshToken = function (bearerToken, callback) {
  db.hgetall(util.format(keys.refreshToken, bearerToken), function (err, token) {
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
  db.sismember(util.format(keys.grantTypes, clientId), grantType, callback);
};

model.saveAccessToken = function (accessToken, clientId, expires, user, callback) {
  db.hmset(util.format(keys.token, accessToken), {
    accessToken: accessToken,
    clientId: clientId,
    expires: expires ? expires.toISOString() : null,
    userId: user.id
  }, callback);
};

model.saveRefreshToken = function (refreshToken, clientId, expires, user, callback) {
  db.hmset(util.format(keys.refreshToken, refreshToken), {
    refreshToken: refreshToken,
    clientId: clientId,
    expires: expires ? expires.toISOString() : null,
    userId: user.id
  }, callback);
};

model.getUser = function (username, password, callback) {
  db.hgetall(util.format(keys.user, username), function (err, user) {
    if (err) return callback(err);

    if (!user || md5(password) !== user.password) return callback();

    callback(null, {
      id: username
    });
  });
};


model.saveClient = function(client, callback){
	var now = new Date().valueOf();
	var clientId = md5(client.name+now);
	var secretId = md5(client.name+clientId+now);

	var keyGrant = util.format(keys.grantTypes, clientId);
	var keyClient = util.format(keys.client, clientId);

	console.log(secretId);
	console.log(clientId);

	db.multi()
		.hmset(keyClient, {
				clientId: clientId
			, clientSecret: secretId
			, name: client.name
			, descr: client.descr
			, platform: client.platform
			, redirectURL: client.redirectURL

		})
		.sadd(keyGrant, [
				'password'
			, 'refresh_token'
		])
		.exec(function (errs) {
			console.log('done');

			if (errs){
				callback(errs);
			}
			else{
				callback(null, {
					clientId: clientId,
					secretId: secretId
				});
			}
		});
}
