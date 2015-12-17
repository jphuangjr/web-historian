var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};


var publicSites = {
  '/index.html': '/index.html',
  '/loading.html': '/loading.html',
  '/styles.css': '/styles.css'
};

exports.serveAssets = function(res, asset, callback) {
  if (publicSites[asset]) {
    fs.readFile(archive.paths.siteAssets + asset, function(err, data) {
      if (err) {
      } else {
        callback(data);
      }
    });
  } else {
    fs.readFile(archive.paths.archivedSites + asset, function(err, data) {
      if (err) {
      } else {
        callback(data);
      }
    });
  }
};



// As you progress, keep thinking about what helper functions you can put here!