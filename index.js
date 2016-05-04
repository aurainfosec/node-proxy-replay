var proxy;
var fs = require('fs');
var hoxy = require('hoxy');
var reply = require('./replyRequest');
var colors = require('colors');
var readline = require('readline');

var rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout
});

rl.question(colors.green('Coookie Header value you want to override? '), (answer) => {
  var cookie = answer;
  rl.close();
  console.log("Cookie: " + colors.red(cookie));

  proxy = hoxy.createServer({certAuthority: {
    key:  fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./crt.pem')
  }}).listen(8090);
  console.log("Listening on 8090".underline);
  console.log("");

  proxy.intercept({
    phase: 'request',
    as: 'string'
  }, function(req, resp, cycle){
    reply.reply(req, cookie);
  });
});

// LOCAL SERVER TO TEST
// var http = require("http");
// var server = http.createServer(function(request, response){
//   console.log(" one request ");
//   var body = [];
//   request.on('data', function(chunk) {
//     body.push(chunk);
//   }).on('end', function() {
//     body = Buffer.concat(body).toString();
//     console.log(request.headers);
//     console.log(body);
//   });
//   response.writeHead(200, {"Content-Type": "text/html"});
//   response.write("******************************");
//   response.end();
// });
// server.listen(80);
