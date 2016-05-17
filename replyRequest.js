var input = require('./userInput');
var colors = require('colors');
var headers = require('./headers');
var request = require('superagent');

var replyThis = function(req){
  return (input.user["domains"].length === 0 || input.user["domains"].indexOf(req.hostname) > -1) &&
  (
    req.headers.accept.indexOf('html') > -1 ||
    req.headers.accept.indexOf('xml')  > -1 ||
    req.headers.accept.indexOf('json') > -1
  )
};

module.exports.reply = function(req){
  if(replyThis(req)){
    request(req.method, req.protocol + '//' + req.hostname + req.url)
    .set(headers.editRequestHeaders(req))
    .send(req.string)
    .end(function(err, res){
      if(typeof res !== 'undefined'){
        console.log(colors.red(req.method) + "  " + (req.hostname + req.url).underline + "  " + colors.green(res.statusCode));
        console.log("");
      }
    });
  }
};
