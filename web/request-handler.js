var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');



exports.handleRequest = function(req, res) {
  if (req.method === "GET") {
    statusCode = 200;
    if (req.url === "/") {
      http.serveAssets(res, '/index.html', function(data) {
        res.writeHead(statusCode, http.headers);
        res.end(data);
      });
    }
  } else if (req.url === 'google.com') {
    http.serveAssets(res, '/google.com', function(data) {
      res.writeHead(statusCode, http.headers);
      res.end(data);
    });
  } else {
    statusCode = 404;
    res.writeHead(statusCode, http.headers);
    res.end();
  }

  // res.end(archive.paths.list);
};