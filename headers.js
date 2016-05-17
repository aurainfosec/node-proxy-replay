var input = require('./userInput');

module.exports.editRequestHeaders = function(req){
  var newHeaders = {};
  for(var attr in req.headers){
    newHeaders[attr] = req.headers[attr];
  }
  for(var attr in input.user['headers']){
    newHeaders[attr] = input.user['headers'][attr];
  }
  return newHeaders;
}
