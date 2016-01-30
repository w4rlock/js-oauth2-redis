# js-oauth2-redis



#Base64 Authorization code
echo -n client_id:client_secret | base64

Authorization: "Basic " + client_id:client_secret (base64 auth code)

curl -H "Authorization: Basic Y2xpZW50OnNlY3JldA==" 
     -H "Content-Type: application/x-www-form-urlencoded" 
     -X POST 
     -d 'username=username&password=password&grant_type=password' 
      http://localhost:3000/oauth/token


#Test Token
Authorization: 'Bearer' + token

curl -H 'Authorization: Bearer 33798ed7b07f59c70788b29f60cfd6e9eb491368' 
     -X GET 
     http://localhost:3000/secret

