/*global describe, it */
'use strict';
var assert = require('assert');
var hypermediadoc = require('../');

var testDoc = require('./example.json');

describe('hypermediadoc node module', function() {
  it('correct markdown for root page', function() {
    var result = hypermediadoc.markdownForRootPage(testDoc);
    assert.equal(result, "# MyTest REST API\nDocumentation for the fabulous Example API\n\n* **Entry Point:** [http://example.com/api](http://example.com/api)\n* **Media Type:** `application/hal+json` ([HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06))\n* **[Richardson Maturity Level](http://martinfowler.com/articles/richardsonMaturityModel.html):** 3 (Hypermedia as the engine of Application State)\n\nThe MyTest API is a *REST API,* or rather *Hypermedia API.* This means that the term *REST* is actually understood as [intended by Roy T. Fielding](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm) – including the *Hypermedia Constraint.* See [this blog post](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) for a more in-depth description of REST and the difference to a simple HTTP-based API which is often mistakenly called *REST API.*\n\nIn short, data is partitioned in *resources* which manifest in *representations.* Those are transferred using a *standardized format* ([JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06)) with *standardized methods* (HTTP/1.1, [RFC 7230](http://tools.ietf.org/html/rfc7230)). Application flow between resources is defined by link relations. URLs are subject to change and must not be hard coded. Instead, link relations can be used to explore and use the APIs.\n\n\n");
  });
  it('correct markdown from resource', function() {
    var result = hypermediadoc.markdownFromResource(testDoc.resources[0]);
    assert.equal(result, "# Resource: account\nA single account.\n\n* [Embedded Resource](#embedded-resource)\n* [GET](#get)\n\n## Embedded Resource\nThis resource is always output as a list with embedded single resources.\nThe structure of an embedded resource is as follows:\n\nJSON Schema: [http://example.com/account](http://example.com/account)\n\n#### Links\n|Relation|Description|Methods|Templated|\n|--------|-----------|-------|---------|\n|self|A single account|GET, PUT|No|\n\n#### Properties\n|Name|Type|Description|Optional|\n|----|----|-----------|--------|\n|accountID||The unique identifier for an account.|No|\n\n\n## GET\nShow account list.\n### Request\nSome additional text to explain the request.\n\n#### Headers\n|Header|Value|Description|Optional|\n|------|-----|-----------|--------|\n|Authorization|Basic||No|\n\n#### Query Parameters\n##### Filters\n|Name|Type|Description|Optional|\n|----|----|-----------|--------|\n|id||filter by id, exact-match|Yes|\n\n##### Pagination\n|Name|Type|Description|Optional|\n|----|----|-----------|--------|\n|page||pagination page value|Yes|\n\n\n#### Properties\n|Name|Type|Description|Optional|\n|----|----|-----------|--------|\n|id||filter by id, exact-match|Yes|\n|page||pagination page value|Yes|\n\n\n### Response: 200 OK\n\n#### Headers\n|Header|Value|\n|------|-----|\n|www-authenticate|basic|\n\n#### Links\n|Relation|Description|Methods|Templated|\n|--------|-----------|-------|---------|\n|self|A single account|GET, PUT|No|\n\n#### Properties\n|Name|Type|Description|Optional|\n|----|----|-----------|--------|\n|accountID||The unique identifier for an account.|No|\n\n\n#### Embedded\n\n* [account](#embeddedResource)\n\n#### Example\n```\n{\"accountID\":\"y2o38h\"}\n```\n");
  });
  it('correct markdown from relation', function() {
    var result = hypermediadoc.markdownFromRelation(testDoc.relations[0]);
    assert.equal(result, "# Relation: myapi:account\nDisplay a user account\n\n**Resource:** [example:account](../account)\n\n### Templating\n\n|Parameter|Description|\n|---------|-----------|\n|id|ID of an account|\n\n");
  });
  it('correct markdown from relation list', function() {
    var result = hypermediadoc.markdownListRelations(testDoc);
    assert.equal(result, "## Relations\n\n* [myapi:account](myapi:account)\n* [Common Relations:](http://www.iana.org/assignments/link-relations/link-relations.xhtml)\n    * collection\n    * curies\n    * first\n    * item\n    * next\n    * prev\n    * self\n\n");
  });
  it('correct markdown from resource list', function() {
    var result = hypermediadoc.markdownListResources(testDoc);
    assert.equal(result, "## Resources\n\n* [account](account)\n");
  });
});
