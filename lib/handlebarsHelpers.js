'use strict';

var http = require('http');

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

  handlebars.registerHelper('stringify', function(value) {
    return JSON.stringify(value);
  });

  return handlebars;
};