#Authorization: 'Bearer' + token


#Base64 Authorization code
#echo -n client_id:client_secret | base64

#Authorization: "Basic " + client_id:client_secret (base64 auth code)

# Get TOKEN
curl -H "Authorization: Basic Y2xpZW50OnNlY3JldA==" \
		 -H "Content-Type: application/x-www-form-urlencoded" \
		 -X POST \
		 -d 'username=username&password=password&grant_type=password' \
		 http://localhost:3000/oauth/token


# Test Token
curl -H 'Authorization: Bearer ab6b265a80a2412ccf0960dd444b6644268e08e0' \
		 -X POST \
		 http://localhost:3000/oauth/validate


# Refresh token
curl -H "Authorization: Basic Y2xpZW50OnNlY3JldA==" \
		 -X POST \
     -d 'refresh_token=383a1002204bab1e7f5c7719dd669f0ac7ddff89&grant_type=refresh_token' \
		 http://localhost:3000/oauth/token
