# img2base64
a tool transfrom img to base64

## Usage

```
import base64thumbnail from 'base64thumbnail'
var promis = base64thumbnail('http://localhost:8090/GitHubResp/img2base64/static/avatar.jpg')
	promis.then((data) => {
		console.info(data)
	})
```

## Install

`npm install base64thumbnail --save`