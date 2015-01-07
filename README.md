#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Node.js module to generate markdown documentation for Hypermedia APIs.

## Features
Generates documentation in markdown for Hypermedia REST APIs that are described in JSON.

## Install

```sh
$ npm install --save hypermediadoc
```

## Usage

Describe your Resources as JSON according to the JSON Schema located at ./schema/resourcedoc.json
The module will then generate markdown documentation that you can process further with a markdown module such as [marked](https://github.com/chjj/marked)

```js
var hypermediadoc = require('hypermediadoc');

var resourceDefinition = {
   "title": "test",
   "description": "A simple test resource",
   "methods": [
     {
       "name": "get",
       "description": "Show a single resource",
       "responses": [
         {
           "code": "200",
           "links": [
             {
               "relation": "self",
               "description": "The URI of this resource",
               "methods": [
                 "get"
               ],
               "templated": false
             }
           ],
           "properties": [
             {
               "name": "sampleProperty",
               "description": "A sample property in our test resource",
               "optional": false
             }
           ]
         }
       ]
     }
   ]
 };

var markdown = hypermediadoc.markdownFromResource(resourceDefinition);
```

## Tests

*tbd*

## License

MIT © [entrecode GmbH](https://entrecode.de)


[npm-url]: https://npmjs.org/package/hypermediadoc
[npm-image]: https://badge.fury.io/js/hypermediadoc.svg
[travis-url]: https://travis-ci.org/entrecode/hypermediadoc
[travis-image]: https://travis-ci.org/entrecode/hypermediadoc.svg?branch=master
[daviddm-url]: https://david-dm.org/entrecode/hypermediadoc.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/entrecode/hypermediadoc
