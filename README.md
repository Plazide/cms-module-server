# CMS Module Server

This package complements the [cms-module-client](https://www.npmjs.com/package/cms-module-client) package by adding functions in the server to render and save content provided from the client package.

## Installation

To install this package simply run:
```sh
npm install cms-module-server
```

## Usage

To use this package properly you will need to connect to a MongoDB server using the [mongoose](https://www.npmjs.com/package/mongoose) package.

To call the save function with data from the client:
```js
const cms = require("cms-module-server");
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.post("cms/save", (req, res) => {
	// There should be some kind of authentication here...

	cms.save(req, res);
});

app.listen(PORT);
```

To call the publish function with data from the client:
```js
const cms = require("cms-module-server");
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.post("cms/publish", (req, res) => {
	// There should be some kind of authentication here...

	cms.publish(req, res);
});

app.listen(PORT);
```

To call the upload function with data from the client:
```js
const cms = require("cms-module-server");
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.post("cms/upload", (req, res) => {
	// There should be some kind of authentication here...

	cms.upload(req, res);
});

app.listen(PORT);
```

To render content that is published:
```js
const cms = require("cms-module-server");
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.use(cms.render("dist"));

// Use express.static to handle default files.
app.use(express.static("dist"));

app.listen(PORT);
```

## Security

It is important that you authenticate users in your endpoints. The [cms-module-client](https://www.npmjs.com/package/cms-module-client) provides an `auth` option that sets an `Authorization` header which can be read on the server. But the help from this package ends there, you will have to solve the rest yourself.