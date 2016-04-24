var conf = {
  // +++++++++++++++++++++++++++++++++++++++++++ DESARROLLO CONFIG ++++++++++++++++++++++++++++++
  dev: {
    MAIL: { auth: { user: 'developer@rockboxstudios.com', pass: 'r0ckb0xstud10s', }, service: 'gmail' },

    APP: {
      PORT: process.env.PORT || 3000,
      //ACCESS_TOKEN_EXPIRE: 3600, //1 hour
			//REFRESH_TOKEN_EXPIRE: 60 * 60 * 48, //2days
      ACCESS_TOKEN_EXPIRE: 360, //1 hour
			REFRESH_TOKEN_EXPIRE: 60 ,

			REDIS_USER: {
					name: 'developer'
				, email: 'developer@rockboxstudios.com'
				, password:'_d3v310p3r_'
			},

			REDIS_APP: {
					name: 'rockbox-oauth2-server'
				, description: 'oauth2 server'
				, platform: ['mobile']
			},

      TMP_DIR: '/tmp/'
    },

    AUTH: {
      TWITTER: { 
        consumerKey: '',
        consumerSecret: '',
        //callbackURL: domain + "/auth/twitter/callback" 
     },

      FACEBOOK: { 
        clientID: '',
        clientSecret: '', 
        //callbackURL: domain + "/auth/facebook/callback",
        profileFields: [ 'email','gender', 'birthday','id', 'first_name','last_name', 'picture']
     },

      GOOGLE: { 
        clientId: '',
        clientSecret: '',
        //callbackURL: domain + "/auth/google/callback" 
     }
    }
  },

  // +++++++++++++++++++++++++++++++++++++++++++ PRODUCTION CONFIG ++++++++++++++++++++++++++++++
  prod: {
    MAIL: { auth: { user: 'developer@rockboxstudios.com', pass: 'r0ckb0xstud10s' }, service: 'gmail' },

    APP: {
      PORT: process.env.PORT || 3000,
      ACCESS_TOKEN_EXPIRE: 3600,
			REFRESH_TOKEN_EXPIRE: 60 * 60 * 48, //2days
      TMP_DIR: '/tmp/'
    },

		REDIS_USER: {
				name: 'developer'
			, email: 'developer@rockboxstudios.com'
			, password:'_d3v310p3r_'
		},

		REDIS_APP: {
				name: 'rockbox-oauth2-server'
			, description: 'oauth2 server'
			, platform: ['mobile']
		},

    AUTH: {
      TWITTER: { 
        consumerKey: '',
        consumerSecret: '',
        //callbackURL: domain + "/auth/twitter/callback" 
      },

      FACEBOOK: { 
        clientID: '',
        clientSecret: '', 
        //callbackURL: domain + "/auth/facebook/callback",
        profileFields: [ 'email','gender', 'birthday','id', 'first_name','last_name', 'picture']
      },

      GOOGLE: { 
        clientId: '',
        clientSecret: '',
        //callbackURL: domain + "/auth/google/callback" 
     }
    }
  }
};

module.exports = (mode) => {
	mode = mode || 'dev';
  return global.cfg = conf[mode];
}
