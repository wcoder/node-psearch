# node-psearch
NodeJS module for the search of popular map using Yandex.Maps API.

## Install
```
npm install node-psearch
```

## Usage

```
var psearch = require('node-psearch');

// ...
```

Show [example](https://github.com/wcoder/node-psearch/blob/master/example/run.js).



Request options:

* `query` - Text search query. For example, the name of the object.
* `ll` - `{longitude,latitude}` longitude and latitude of the center of the field (in degrees).
* `spn` - Length of the center of gravity (degrees).
* `count` - Maximum number of displayed results.

Result format:

* `name` - `string` - Name of the object
* `coordinates` - `array` - Сoordinates `[longitude, latitude]`