#Node JS - OAuth2 / RedisCache

## Start Server

```bash
npm start 

```


## Register App Name
```bash
 curl -H "Content-Type: application/json" 
			-X POST  
			-d '{"name":"app1", "description":"twitter_app", "platform":"mobile"}'     
			http://localhost:3000/app/register


```

## Get token

```bash

curl -H "Authorization: Basic Y2xpZW50OnNlY3JldA==" 
     -H "Content-Type: application/x-www-form-urlencoded" 
     -X POST 
     -d 'username=username&password=password&grant_type=password' 
      http://localhost:3000/oauth/token

```

Header params

echo -n client_id:client_secret | base64

Authorization: "Basic " + (base64 auth code)



## Test Token
Authorization: 'Bearer' + token

```bash

curl -H 'Authorization: Bearer 33798ed7b07f59c70788b29f60cfd6e9eb491368' 
     -X GET 
     http://localhost:3000/secret

```

## Refresh token

```bash
curl -H "Authorization: Basic Y2xpZW50OnNlY3JldA==" 
		 -X POST 
     -d 'refresh_token=383a1002204bab1e7f5c7719dd669f0ac7ddff89&grant_type=refresh_token' 
		 http://localhost:3000/oauth/token

```
