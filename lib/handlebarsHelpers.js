'use strict';

var http = require('http');
var _ = require('lodash');

module.exports = function(handlebars) {
  handlebars.registerHelper('toUpperCase', function(value) {
    if (value) {
      return new handlebars.SafeString(value.toUpperCase());
    } else {
      return '';
    }
  });

  handlebars.registerHelper('toLowerCase', function(value) {
    if (value) {
      return new handlebars.SafeString(value.toLowerCase());
    } else {
      return '';
    }
  });

  handlebars.registerHelper('boolToEnglish', function(value) {
    if (value) {
      return 'Yes';
    } else {
      return 'No';
    }
  });

  handlebars.registerHelper('httpExplain', function(value) {
    return http.STATUS_CODES[value];
  });

  handlebars.registerHelper('richardsonExplain', function(value) {
    switch (value) {
      case 3:
        return 'Hypermedia as the engine of Application State';
      case 2:
        return 'Correct usage of HTTP Verbs';
      case 1:
        return 'Individual Resources';
      case 0:
        return 'RPC tunneling over HTTP';
    }
    return '';
  });

  handlebars.registerHelper('stringify', function(value) {
    return JSON.stringify(value);
  });

  handlebars.registerHelper('grouped-list', function(context, options) {
    var ret = "";
    var grouped = _.groupBy(context, 'group');
    for(var key in grouped) {
      options.data.key = (key !== 'undefined' ? key : null);
      ret = ret + options.fn(grouped[key]);
    }

    return ret;
  });

  return handlebars;
};