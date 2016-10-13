var input = require('./userInput');
var qs = require('querystring');

var isPostAndFormData = function(req){
  return req.method !== 'GET' && (req.headers.accept.indexOf('html') > -1)
};

module.exports.editRequestBody = function(req){
  var body = req.string;
  if(!isPostAndFormData(req)) return body;
  if(body === '') return '';
  var newBody = qs.parse(body);
  for(var attr in input.user['bodyParams']){
    newBody[attr] = input.user['bodyParams'][attr];
  }
  return qs.stringify(newBody);
}
