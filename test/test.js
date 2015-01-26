/*global describe, it */
'use strict';
var assert = require('assert');
var hypermediadoc = require('../');

var testResource = {
  "title": "account",
  "description": "A single account.",
  "methods": [
    {
      "name": "get",
      "description": "Show a single account.",
      "request": {
        "schema": "",
        "headers": {
          "autorization": "Basic"
        },
        "properties": [
          {
            "name": "userid",
            "description": "User ID of the account",
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
          "example": {"accountID": "y2o38h"}
        }
      ]
    }
  ]
};

describe('hypermediadoc node module', function() {
  it('correct markdown from resource', function() {
    var result = hypermediadoc.markdownFromResource(testResource);
    assert.equal(result, "# Resource: account\nA single account.\n\n* [GET](#get)\n\n## GET\nShow a single account.\n### Request\n#### Headers\n|Header|Value|\n|------|-----|\n|autorization|Basic|\n\n#### Properties\n|Name|Description|Optional|\n|----|-----------|--------|\n|userid|User ID of the account|Yes.|\n\nSome additional text to explain the request.\n\n### Response: 200 OK\n\n#### Headers\n|Header|Value|\n|------|-----|\n|www-authenticate|basic|\n\n#### Links\n|Relation|Description|Methods|Templated|\n|--------|-----------|-------|---------|\n|self|A single account|GET, PUT|No.|\n\n#### Properties\n|Name|Description|Optional|\n|----|-----------|--------|\n|accountID|The unique identifier for an account.|No.|\n\n#### Example\n```\n{\"accountID\":\"y2o38h\"}\n```\n");
  });

  it('correct html from resource', function() {
    var result = hypermediadoc.htmlFromResource(testResource);
    assert.equal(result, "<!DOCTYPE html>\n<html>\n<head>\n    <link href=\"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.1/cosmo/bootstrap.min.css\" rel=\"stylesheet\">\n    <script src=\"https://code.jquery.com/jquery-2.1.1.min.js\"></script>\n    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js\"></script>\n    <title>account Documentation</title>\n</head>\n<body>\n<div class=\"container\">\n    <h1 id=\"resource-account\">Resource: account</h1>\n<p>A single account.</p>\n<ul>\n<li><a href=\"#get\">GET</a></li>\n</ul>\n<h2 id=\"get\">GET</h2>\n<p>Show a single account.</p>\n<h3 id=\"request\">Request</h3>\n<h4 id=\"headers\">Headers</h4>\n<table>\n<thead>\n<tr>\n<th>Header</th>\n<th>Value</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>autorization</td>\n<td>Basic</td>\n</tr>\n</tbody>\n</table>\n<h4 id=\"properties\">Properties</h4>\n<table>\n<thead>\n<tr>\n<th>Name</th>\n<th>Description</th>\n<th>Optional</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>userid</td>\n<td>User ID of the account</td>\n<td>Yes.</td>\n</tr>\n</tbody>\n</table>\n<p>Some additional text to explain the request.</p>\n<h3 id=\"response-200-ok\">Response: 200 OK</h3>\n<h4 id=\"headers\">Headers</h4>\n<table>\n<thead>\n<tr>\n<th>Header</th>\n<th>Value</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>www-authenticate</td>\n<td>basic</td>\n</tr>\n</tbody>\n</table>\n<h4 id=\"links\">Links</h4>\n<table>\n<thead>\n<tr>\n<th>Relation</th>\n<th>Description</th>\n<th>Methods</th>\n<th>Templated</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>self</td>\n<td>A single account</td>\n<td>GET, PUT</td>\n<td>No.</td>\n</tr>\n</tbody>\n</table>\n<h4 id=\"properties\">Properties</h4>\n<table>\n<thead>\n<tr>\n<th>Name</th>\n<th>Description</th>\n<th>Optional</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>accountID</td>\n<td>The unique identifier for an account.</td>\n<td>No.</td>\n</tr>\n</tbody>\n</table>\n<h4 id=\"example\">Example</h4>\n<pre><code>{&quot;accountID&quot;:&quot;y2o38h&quot;}\n</code></pre>\n</div>\n</body>\n<script type=\"text/javascript\">\n    $( \"table\" ).addClass( \"table table-striped\" );\n</script>\n</html>");
  });

});
