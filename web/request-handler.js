var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var url = require('url');

exports.handleRequest = function(req, res) {
  if (req.method === "GET") {
    statusCode = 200;
    if (req.url === "/") {
      // archive.downloadUrls(["www.google.com", "wwww.facebook.com", "www.yahoo.com"])
      http.serveAssets(res, '/index.html', function(data) {
        res.writeHead(statusCode, http.headers);
        res.end(data);
      });
    }
  } else if (req.method === 'POST') {
      statusCode = 201;
      var body = '';
      req.on('data', function(data) {
        body+=data;
      });
      req.on('end', function() {
        body = JSON.stringify(body);
        body = body.slice(body.indexOf("=")+1, body.length-1);
        archive.isUrlInList(body, function(bool) {
          if (bool) {
            console.log("hello");
            http.serveAssets(res, "/" + body, function(data) {
              res.writeHead(statusCode, http.headers);
              // console.log("data is" , data);
              console.log("hi");
              res.end(data);
            });
          } else {
            http.serveAssets(res, "/loading.html", function(data) {
              res.writeHead(statusCode, http.headers);
              // console.log("data is" , data);
              archive.addUrlToList(body, function() {
                console.log("adding to body");
              });
              res.end(data);
          });
          }
        });
      });  
  } else {
    statusCode = 404;
    console.log("error");
    res.writeHead(statusCode, http.headers);
    res.end();
  }
};