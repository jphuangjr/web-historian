var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log('error reading URLs');
    } else {
      var websites = data.toString().split("\n");
      callback(websites);
    }
  });

};

exports.isUrlInList = function(url, callback) {
  var urls = this.readListOfUrls();
  callback(_.contains(urls, url));
};

exports.addUrlToList = function(url, callback) {
  var newList = this.readListOfUrls(function(websites) {
    websites.push(url);
    fs.appendFile(exports.paths.list + "/sites.txt", url + "\n", function(err) {
      if (err) {console.log("hi");
      }
    });  
  });
  
  
  callback(newList);
};

exports.isUrlArchived = function(url, callback) {
  var bool = false;
  fs.exists(exports.paths.archivedSites + "/" + url, function(exists) {
    if (exists) {
      bool = true;
    } else {
      bool = false;
    }
  });
  callback(bool);
};

exports.downloadUrls = function(websitesCheck) {
  var needToBeDownloaded = [];

  //Builds the array of websites we don't have
  _.each(websitesCheck, function(website) {
    //isURLArchived on each website
    exports.isUrlArchived(website, function(bool) {
      if (!bool) {
        needToBeDownloaded.push(website);
      }
    });
  });
  _.each(needToBeDownloaded, function(website) {
    request("http://" + website, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        fs.writeFile(exports.paths.archivedSites + "/" + website, body, function(err) {
          if (err) return console.log(err);
        });
      }
    });
  });
  
  for (var i = 0; i < needToBeDownloaded.length; i++) {
   fs.appendFile(exports.paths.archivedSites + "/sites.txt", needToBeDownloaded[i] + "\n", function(err) {
      if (err) {console.log("hi");
      }
    });
  }
};

// };