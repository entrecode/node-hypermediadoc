'use strict';

var fs         = require('fs')
  , handlebars = require('handlebars')
  , marked     = require('marked')
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

var handlebarsHelpers = require('./lib/handlebarsHelpers');

var templates = {
  resource: {
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/resource.md.handlebars', {encoding: 'utf8'})),
    html: handlebars.compile(fs.readFileSync(__dirname + '/templates/resource.html.handlebars', {encoding: 'utf8'}))
  },
  relation: {
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/relation.md.handlebars', {encoding: 'utf8'}))
  },
  root: {
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/root.md.handlebars', {encoding: 'utf8'}))
  },
  listRelations: {
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/listRelations.md.handlebars', {encoding: 'utf8'}))
  },
  listResources: {
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/listResources.md.handlebars', {encoding: 'utf8'}))
  }
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

  markdownForRootPage: function(apiDoc) {
    var validation = tv4.validateResult(apiDoc, schemas.hypermediadoc, false, true);
    if (!validation.valid) {
      throw validation.error;
    }
    return templates.root.markdown(apiDoc);
  },

  htmlForRootPage: function(apiDoc) {
    return marked(this.markdownForRootPage(apiDoc));
  },

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
    return templates.resource.markdown(resource);
  },

  htmlFromResource: function(resource) {
    return marked(this.markdownFromResource(resource));
  },

  markdownFromRelation: function(relation) {
    var validation = tv4.validateResult(relation, schemas.hypermediadoc.definitions.relations.items, false, true);
    if (!validation.valid) {
      throw validation.error;
    }
    return templates.relation.markdown(relation);
  },

  htmlFromRelation: function(relation) {
    return marked(this.markdownFromRelation(relation));
  },

  markdownListRelations: function(apiDoc) {
    var validation = tv4.validateResult(apiDoc, schemas.hypermediadoc, false, true);
    if (!validation.valid) {
      throw validation.error;
    }
    return templates.listRelations.markdown(apiDoc);
  },

  markdownListResources: function(apiDoc) {
    var validation = tv4.validateResult(apiDoc, schemas.hypermediadoc, false, true);
    if (!validation.valid) {
      throw validation.error;
    }
    return templates.listResources.markdown(apiDoc);
  },
  
  htmlListRelations: function(apiDoc) {
    return marked(this.markdownListRelations(apiDoc));
  },

  htmlListResources: function(apiDoc) {
    return marked(this.markdownListResources(apiDoc));
  }

};