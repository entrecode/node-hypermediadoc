#  [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Node.js module to generate markdown or HTML documentation for Hypermedia APIs.

## Features
Generates documentation in markdown or HTML for Hypermedia REST APIs that are described in JSON.

## Install

```sh
$ npm install hypermediadoc --save
```

## Usage

Describe your API, Relations and Resources as JSON according to the JSON Schema located at ./schema/hypermediadoc.json
The module will then generate markdown documentation and optionally also HTML.


```
var hypermediadoc = require('hypermediadoc');

var apiDefinition = {
  "title": "MyTest REST API",
  "description": "Documentation for the fabulous Example API",
  "entryPoint": "http://example.com/api",
  "mediaType": {
    "identifier": "application/hal+json",
    "name": "HAL",
    "link": "https://tools.ietf.org/html/draft-kelly-json-hal-06"
  },
  "richardsonMaturityLevel": 3,
  "restExplanation": "The MyTest API is a *REST API,* or rather *Hypermedia API.* This means that the term *REST* is actually understood as [intended by Roy T. Fielding](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm) – including the *Hypermedia Constraint.* See [this blog post](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) for a more in-depth description of REST and the difference to a simple HTTP-based API which is often mistakenly called *REST API.*\n\nIn short, data is partitioned in *resources* which manifest in *representations.* Those are transferred using a *standardized format* ([JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06)) with *standardized methods* (HTTP/1.1, [RFC 7230](http://tools.ietf.org/html/rfc7230)). Application flow between resources is defined by link relations. URLs are subject to change and must not be hard coded. Instead, link relations can be used to explore and use the APIs.",
  "moreDocContent": "",
  "relations": [
    {
      "title": "myapi:account",
      "description": "Display a user account",
      "resource": {
        "name": "example:account",
        "href": "../account"
      },
      "method": "get",
      "templated": [
        {
          "key": "id",
          "description": "ID of an account"
        }
      ]
    }
  ],
  "commonRelations": [
    "collection",
    "curies",
    "first",
    "item",
    "next",
    "prev",
    "self"
  ],
  "resources": [
    {
      "title": "account",
      "description": "A single account.",
      "embeddedResourceInListResource": {
        "description": "This resource is always output as a list with embedded single resources.\nThe structure of an embedded resource is as follows:",
        "schema": "http://example.com/account",
        "links": [
          {
            "relation": "self",
            "description": "A single account",
            "methods": [
              "get",
              "put"
            ],
            "templated": false
          }
        ],
        "properties": [
          {
            "name": "accountID",
            "description": "The unique identifier for an account.",
            "optional": false
          }
        ]
      },
      "methods": [
        {
          "name": "get",
          "description": "Show account list.",
          "request": {
            "schema": "",
            "headers": [{
              "header": "Authorization",
              "value": "Basic",
              "description": "",
              "optional": false
            }],
            "query": [
              {
                "name": "id",
                "description": "filter by id, exact-match",
                "optional": true,
                "group": "Filters"
              },
              {
                "name": "page",
                "description": "pagination page value",
                "optional": true,
                "group": "Pagination"
              }
            ],
            "properties": [
              {
                "name": "id",
                "description": "filter by id, exact-match",
                "optional": true
              },
              {
                "name": "page",
                "description": "pagination page value",
                "optional": true
              }
            ],
            "description": "Some additional text to explain the request."
          },
          "responses": [
            {
              "code": 200,
              "schema": "",
              "description": "",
              "headers": {
                "www-authenticate": "basic"
              },
              "links": [
                {
                  "relation": "self",
                  "description": "A single account",
                  "methods": [
                    "get",
                    "put"
                  ],
                  "templated": false
                }
              ],
              "properties": [
                {
                  "name": "accountID",
                  "description": "The unique identifier for an account.",
                  "optional": false
                }
              ],
              "embedded": [
                {
                  "name": "account",
                  "href": "#embeddedResource"
                }
              ],
              "example": {
                "accountID": "y2o38h"
              }
            }
          ]
        }
      ]
    }
  ]
};

var markdown = hypermediadoc.getDoc('root', apiDefinition, 'markdown');
var html = hypermediadoc.getDoc('root', apiDefinition, 'html');


// single resource:
markdown = hypermediadoc.getDoc('resource', apiDefinition.resources[0], 'markdown');
html = hypermediadoc.getDoc('resource', apiDefinition.resources[0], 'html');


```

## API

### hypermediadoc.getDoc(type, source, format)

Synchronous function. Returns a markdown or html string.

`type` can be one of:

 * `root` – an overview page with general information
 * `resource` – a resource detail page
 * `relation` – a relation detail page
 * `resourceList` – a list of available resources
 * `relationList` – a list of available relations
  

`source` is the API definition as JSON or a specific resource or relation part of that when `type` is `resource` or `relation`.

`format` can be `markdown` or `html`. Note that no full HTML page is rendered, just the content part.

If illegal values are given or if `source` is not valid according to the JSON schema, errors are thrown. So you *should* wrap the function call in a `try...catch` construct.


## Customization

### Templates
The module uses [Handlebars](http://handlebarsjs.com/) as template engine for the markdown files.
They are located in `./templates`.

The following Handlebars helpers are available:

* `toUpperCase` – UPPERCASES a string
* `toLowerCase` – lowercases a string
* `boolToEnglish` – translates `true` to 'Yes' and `false` to `No`.
* `httpExplain` – returns the description for a HTTP status code (200: ok, 404: not found, …)
* `richardsonExplain` – returns the description for a Richardson Maturity Level
* `stringify` – JSON.stringify()
* `grouped-list` – groups a collection by the value in `group`. The group name is available in `@key`, the sub-collection in `this`.

## Tests

```
mocha
```

## Changelog

### 1.0.7
* updated dependencies

### 1.0.6
* updated dependencies

### 1.0.5
* updated dependencies

### 1.0.4
* updated dependencies

### 1.0.3
* updated dependencies

### 1.0.2
* updated dependencies

### 1.0.1
* switched from [marked](https://github.com/chjj/marked) to [markdown-it](https://github.com/markdown-it/markdown-it) due to [security problem](https://nodesecurity.io/advisories/marked_redos)

### 1.0.0
* large overhaul (incompatible API changes…!)
* new JSON Schema
* only return the content part when HTML is requested, no full html page (no header, …)
* added templates for root page, relation detail, and lists
* improved API (only one method now). Old methods are deprecated but should still work.

### 0.0.3
* added HTML parsing with marked

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
