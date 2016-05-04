var colors = require('colors');
var request = require('superagent');

module.exports.replyThis  = function(req){
  return (
    req.headers.accept.indexOf('html') > -1 ||
    req.headers.accept.indexOf('xml')  > -1 ||
    req.headers.accept.indexOf('json') > -1)
};

module.exports.reply = function(req, cookie){
  if(req.hostname !== 'www.australianboardcommunity.com') return;
  request(req.method, req.protocol + '//' + req.hostname + req.url)
  //.send({ name: 'Manny', species: 'cat' })
  .set('Cookie', cookie)
  .set('user-agent', 'Mozilla/5.0 (X11; Linux x86_64; rv:43.0) Gecko/20100101 Firefox/43.0')
  .end(function(err, res){
    if(typeof res !== 'undefined'){
      console.log(req.headers.accept);
      console.log(colors.red(req.method) + " " + (req.hostname + req.url).underline + "  " + colors.green(res.statusCode));
      console.log("");
    }
  });
};
