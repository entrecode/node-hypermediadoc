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
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/resource.md.handlebars', {encoding: 'utf8'}))
  },
  relation: {
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/relation.md.handlebars', {encoding: 'utf8'}))
  },
  root: {
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/root.md.handlebars', {encoding: 'utf8'}))
  },
  relationList: {
    markdown: handlebars.compile(fs.readFileSync(__dirname + '/templates/listRelations.md.handlebars', {encoding: 'utf8'}))
  },
  resourceList: {
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

  /**
   * generate documentation
   * @param {string} type   type of the doc page to generate ('root', 'resource', 'relation', 'resourceList' or 'relationList')
   * @param {object} source A full JSON according to the hypermediadoc JSON schema for root and lists, or a sub-part of that JSON for a single relation or resource
   * @param {string} format Either 'html' or 'markdown'
   * @returns {string}      Generated documentation in html or markdown.
   */
  getDoc: function(type, source, format) {
    if (['root', 'resource', 'relation', 'resourceList', 'relationList'].indexOf(type) === -1) {
      throw new Error('unknown type: ' + type);
    }
    if (['html', 'markdown'].indexOf(format) === -1) {
      throw new Error('unsupported format: '+format);
    }
    var schema;
    switch (type) {
      case 'resource':
        schema = schemas.hypermediadoc.definitions.resources.items;
        break;
      case 'relation':
        schema = schemas.hypermediadoc.definitions.relations.items;
        break;
      default:
        schema = schemas.hypermediadoc;
    }
    var validation = tv4.validateResult(source, schema, false, true);
    if (!validation.valid) {
      throw validation.error;
    }
    var markdown = templates[type].markdown(source);
    if (format === 'html') {
      return marked(markdown);
    }
    return markdown;
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param apiDoc
   * @returns {string}
   */
  markdownForRootPage: function(apiDoc) {
    return this.getDoc('root', apiDoc, 'markdown');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param apiDoc
   * @returns {string}
   */
  htmlForRootPage: function(apiDoc) {
    return this.getDoc('root', apiDoc, 'html');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param resource
   * @returns {string}
   */
  markdownFromResource: function(resource) {
    return this.getDoc('resource', resource, 'markdown');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param resource
   * @returns {string}
   */
  htmlFromResource: function(resource) {
    return this.getDoc('resource', resource, 'html');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param relation
   * @returns {string}
   */
  markdownFromRelation: function(relation) {
    return this.getDoc('relation', relation, 'markdown');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param relation
   * @returns {string}
   */
  htmlFromRelation: function(relation) {
    return this.getDoc('relation', relation, 'html');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param apiDoc
   * @returns {string}
   */
  markdownListRelations: function(apiDoc) {
    return this.getDoc('relationList', apiDoc, 'markdown');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param apiDoc
   * @returns {string}
   */
  markdownListResources: function(apiDoc) {
    return this.getDoc('resourceList', apiDoc, 'markdown');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param apiDoc
   * @returns {string}
   */
  htmlListRelations: function(apiDoc) {
    return this.getDoc('relationList', apiDoc, 'html');
  },

  /**
   * legacy method. Use getDoc(type, source, format) instead.
   * @param apiDoc
   * @returns {string}
   */
  htmlListResources: function(apiDoc) {
    return this.getDoc('resourceList', apiDoc, 'html');
  }

};