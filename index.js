process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // allows to use extra custom https proxy

var fs = require('fs');
var colors = require('colors');

var initProxyAfterUserOptions = function(port){
  var proxy = require('hoxy').createServer(
    {
      certAuthority: {
        key:  fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./crt.pem')
      }
    }).listen(port);
  console.log(("Listening on " + port).underline);
  console.log("");

  proxy.on('error', function (err) {
    console.log(err);
  });

  proxy.intercept({
    phase: 'request',
    as: 'string'
  }, function(req, resp, cycle){
    require('./replyRequest').reply(req);
  });
};

require('./options').init(initProxyAfterUserOptions);
