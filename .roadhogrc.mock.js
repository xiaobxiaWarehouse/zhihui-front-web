var path = require('path');
var fs = require('fs');

const mock = {};

function read(filePath, callback) {
  fs.readdirSync(filePath).forEach(function (file) {
    var fileInfo = fs.statSync(path.resolve(filePath, file));
    if(fileInfo.isDirectory()) {
      read(path.resolve(filePath, file), callback)
    } else {
      if(path.extname(file) === '.js') {
        var mockFile = require(path.resolve(filePath, file))
        if(callback)
          callback(mockFile)
      }
    }
  })
}

read(path.resolve(path.join(__dirname + '/mock')), function(mockFile) {
  Object.assign(mock, mockFile)
});

module.exports = mock;
