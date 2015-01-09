#  [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-url]][daviddm-image]

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

## API

### hypermediadoc.markdownFromResource(resourceDefinition)

Synchronous function. Returns a markdown string.

If `resourceDefinition` is no valid JSON with `resourcedoc` JSON schema, an error is thrown.
The form of the returned markdown is defined by the `resource.md.handlebars` schema.

## Customization

### Templates
The module uses [Handlebars](http://handlebarsjs.com/) as template engine for the markdown files.
They are located in `./templates`.

The following Handlebars helpers are available:

* `toUpperCase` – UPPERCASES a string
* `toLowerCase` – lowercases a string
* `boolToEnglish` – translates `true` to 'Yes' and `false` to `No`.
* `httpExplain` – returnes the description for a HTTP status code (200: ok, 404: not found, …)
* `stringify` – JSON.stringify()


## Tests

```
mocha
```

## Changelog

### 0.0.2
* fix for usage as a node module
* fixes for npm installation
* improvements in schema and template

### 0.0.1
* initial release

## License

MIT © [entrecode GmbH](https://entrecode.de)


[npm-url]: https://npmjs.org/package/hypermediadoc
[npm-image]: https://badge.fury.io/js/hypermediadoc.svg
[daviddm-url]: https://david-dm.org/entrecode/node-hypermediadoc.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/entrecode/node-hypermediadoc
