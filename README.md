# mtgjson

Fetches AllSets.json from http://mtgjson.com and caches it so you are always sure to have the newest version.

Also - the JSON data is collected by @Sembiance, https://github.com/Sembiance/mtgjson

## Installation

`npm install mtgjson`

## Usage

``` js
var mtgjson = require('mtgjson');

mtgjson(function(err, data) {
	if (err) return console.log(err);

	console.log(data.LEA.cards); // Prints out all cards from the Limited Edition Alpha (LEA) set
});
```

## License
MIT