'use strict';

var fs         = require('fs')
  , handlebars = require('handlebars')
  , marked     = require('marked')
  , validator = require('json-schema-remote')
  , tv4 = require('tv4')
  , tv4formats = require('tv4-formats')

, schemas    = {
      hypermediadoc: require('./schema/hypermediadoc.json')
    }
  ;

tv4.addFormat(tv4formats);
for (var schema in schemas) {
  tv4.addSchema(schemas[schema]);
}

validator.validate(schemas.hypermediadoc, schemas.hypermediadoc.$schema, function(error, valid) {
  if (error) {
    console.log(error);
  } else {
    console.log('hypermediadoc is valid')
  }

});

var handlebarsHelpers = require('./lib/handlebarsHelpers');

var templates = {
  markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/resource.md.handlebars', {encoding: 'utf8'})),
  html: handlebars.compile(fs.readFileSync(__dirname + '/templates/resource.html.handlebars', {encoding: 'utf8'}))
}

handlebars = handlebarsHelpers(handlebars);

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

var hypermediadoc = module.exports = {

  /**
   * render Markdown from a resource definition using the resource template
   * @param resource JSON that complies to the resourcedoc JSON Schema
   * @returns Markdown string
   */
  markdownFromResource: function(resource) {
    var validation = tv4.validateResult(resource, schemas.hypermediadoc.definitions.resources.items, false, true);
    if (!validation.valid) {
      throw validation.error;
    }
    return templates.markdown(resource);
  },

  htmlFromResource: function(resource) {
    var data = {
      document: marked(this.markdownFromResource(resource)),
      title: resource.title + ' Documentation'
    };
    return templates.html(data);
  }
};