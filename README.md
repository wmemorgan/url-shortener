# URL Shortener Microservice

> ### User Stories:
    1.  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
    2.  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
    3.  If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
    4.  When I visit that shortened URL, it will redirect me to my original link.
  
### Example creation usage:
```
https://https://wme-url-shortener.glitch.me/new/https://www.google.com
```


### Example creation output
```json
{ "original_url":"https://www.google.com", "short_url":"https://https://wme-url-shortener.glitch.me/ryPTR_HnG}
```

### Usage:
```
https://https://wme-url-shortener.glitch.me/ryPTR_HnG
```

### Will redirect to:
```
https://www.google.com
```