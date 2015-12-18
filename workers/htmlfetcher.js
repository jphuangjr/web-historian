// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require("../helpers/archive-helpers");

var download = function() {
  // console.log("downloaded")
  archive.readListOfUrls(function(data) {
    archive.downloadUrls(data);
    console.log(data);
    console.log("downloaded")
  });
};

download();