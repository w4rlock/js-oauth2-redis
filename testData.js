#! /usr/bin/env node
'use strict'

let db = require('redis').createClient();
let md5 = require('md5');


db.multi()
  .hmset('users:username', {
    id: 'username',
    username: 'username',
    password: md5('password')
  })
  .hmset('clients:client', {
    clientId: 'client',
    clientSecret: 'secret'
  })
  .sadd('clients:client:grant_types', [
    'password',
    'refresh_token'
  ])
  .exec(function (errs) {
    if (errs) {
      console.error(errs[0].message);
      return process.exit(1);
    }

    console.log('Client and user added successfully');
    process.exit();
  });
