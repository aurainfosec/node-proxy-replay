var fs = require('fs');
var colors = require('colors');

var initProxyAfterUserOptions = function(port){
  var proxy = require('hoxy').createServer({certAuthority: {
    key:  fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./crt.pem')
  }}).listen(port);
  console.log(("Listening on " + port).underline);
  console.log("");

  proxy.intercept({
    phase: 'request',
    as: 'string'
  }, function(req, resp, cycle){
    require('./replyRequest').reply(req);
  });
}

require('./options').init(initProxyAfterUserOptions);

// LOCAL SERVER TO TEST
// var http = require("http");
// var server = http.createServer(function(request, response){
//   console.log(" one request ");
//   var body = [];
//   request.on('data', function(chunk) {
//     body.push(chunk);
//   }).on('end', function() {
//     body = Buffer.concat(body).toString();
//     // console.log(request.headers);
//     // var json = JSON.parse(body);
//     // console.log(json);
//   });
//   response.writeHead(200, {"Content-Type": "text/html"});
//   // response.write("******************************");
//   response.end();
// });
// server.listen(80);
