# Express API to change the URL

This is an ExpressJS and MongoDB project of implementing an API which can change the URL into another domain, and when redirected to the changed URL, it will led to the original URL.


## Endpoints

- To signUp, a POST method is to be sent to the BASE URL: `https://url134/user/signup`, and to logIn, similarly a POST method is to be sent to the BASE URL: `https://url134.vercel.app/user/login`
/POST
```
curl --location 'https://url134.vercel.app/user/signup' \
--header 'Content-Type: application/json' \
--data '{
	"username": "admin"	,
	"password": "pwd"
}'
```
The above code is about posting credentials for sign up, while to login, simply change the url to `https://url134.vercel.app/user/login`

- To change the URL, a POST method is to be sent on the BASE URL: `https://url134.vercel.app/url`, 

/POST

```
curl --location 'https://url134.vercel.app/' \
--header 'Content-Type: application/json' \
--data '{
	"url": "https://huggingface.co/chat/conversation/6686572d071b36c3ca40a74c"
}'
```

Result-
```
{
	"shortId": "GjmTpncT"
}
```
The above shortId, will then be appended to the domain resulting in the url: 
```
https://url134.vercel.app/<shortId> 
```
By redirecting this endpoint, you will get redirected to the original url.


- To get the analytics of the changed URL (number of clicks, original url, timestamps), a GET method is to be applied on the BASE URL: `https://url134.vercel.app/url/analytics/<userId_fromMongoDB>`

/GET

```
curl --location 'https://url134.vercel.app/url/analytics/ObjectId("
668950733056c639d4970b11")'
```
Result-
```
{
	"analytics": {
		"clickHistory": {
			"clicks": 2,
			"history": [
				{
					"timeStamp": 1720188715674,
					"ipAddr": "127.0.0.1",
					"_id": "6687ff2b482d670d1e57e16a"
				},
				{
					"timeStamp": 1720188729995,
					"ipAddr": "127.0.0.1",
					"_id": "6687ff39482d670d1e57e16c"
				}
			]
		},
		"_id": "6687ff24482d670d1e57e168",
		"shortId": "d_x2wN4T",
		"redirectUrl": "https://www.youtube.com/watch?v=kKAue9DiHc0&t=86s",
		"__v": 0
	}
}
```




