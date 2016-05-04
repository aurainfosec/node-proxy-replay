var proxy;
var fs = require('fs');
var hoxy = require('hoxy');
var reply = require('./replyRequest');
var readline = require('readline');

var rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout
});

rl.question('What is the Coookie Header? ', (answer) => {
  var cookie = answer;
  rl.close();
  console.log("Cookie: " + cookie);

  proxy = hoxy.createServer({certAuthority: {
    key:  fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./crt.pem')
  }}).listen(8090);
  console.log("Listening on 8090");
  console.log("");

  proxy.intercept({
    phase: 'request'
  }, function(req, resp, cycle) {
    if(reply.replyThis(req)){
      reply.reply(req, cookie);
    }
  });
});
