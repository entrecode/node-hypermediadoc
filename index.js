'use strict';

var fs = require('fs');
var handlebars = require('handlebars');

var handlebarsHelpers = require('./lib/handlebarsHelpers');

module.exports = function(str) {
  console.log(str || 'Rainbow');
};

var resourceTemplate = handlebars.compile(fs.readFileSync('./templates/resource.md.handlebars', {encoding: 'utf8'}));

handlebars = handlebarsHelpers(handlebars);

var resource = {
  "title": "account",
  "description": "A single entrecode account",
  "methods": [
    {
      "name": "get",
      "description": "Show a single entrecode account",
      "request": {
        "schema": "",
        "headers": {
          "autorization": "Bearer token"
        },
        "properties": [
          {
            "name": "email",
            "description": "new email",
            "optional": true
          }
        ],
        "description": "When changing state and/or isPrincess, the logged in user to perform this action needs to have princess (root/admin) access. Deleting an OAuth / OpenID Connect connection is only allowed if hasPassword is true or an other connection which is not pending exists."
      },
      "responses": [
        {
          "code": "200",
          "schema": "",
          "description": "",
          "headers": {
            "www-authenticate": "bearer"
          },
          "links": [
            {
              "relation": "self",
              "description": "A single entrecode account",
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
              "description": "The unique identifier for an account as Version 4 UUID (RFC4122).",
              "optional": false
            }
          ],
          "example": {"x": "y"}
        }
      ]
    }
  ]
};

function markdownFromResource(resource) {
  // TODO check for JSON schema

  var result = resourceTemplate(resource);

  console.log(result);
}

markdownFromResource(resource);
