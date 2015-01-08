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
          "code": "200",
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


describe('hypermediadoc node module', function () {
  it('correct markdown from resource', function () {
    var result = hypermediadoc.markdownFromResource(testResource);
    assert.equal(result, '# account\nA single account.\n\n* [GET](#get)\n\n## GET\nShow a single account.\n\n### Request\n\n#### Headers\n|Header|Value|\n|------|-----|\n|autorization|Basic|\n\n#### Properties\n|Name|Description|Optional|\n|----|-----------|--------|\n|userid|User ID of the account|Yes.|\n\nSome additional text to explain the request.\n\n### Response: 200 OK\n\n#### Headers\n|Header|Value|\n|------|-----|\n|www-authenticate|basic|\n\n#### Links\n|Relation|Description|Methods|Templated|\n|--------|-----------|-------|---------|\n|self|A single account|GET, PUT|No.|\n\n#### Properties\n|Name|Description|Optional|\n|----|-----------|--------|\n|accountID|The unique identifier for an account.|No.|\n\n#### Example\n```\n{\"accountID\":\"y2o38h\"}\n```\n');
  });
});
