var hoxy = require('hoxy');
var proxy;
var readline = require('readline');
var fs = require('fs');

const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout
});

rl.question('What is the Coookie Header? ', (answer) => {
  cookie = answer;
  rl.close();
  console.log("Cookie: " + cookie);
  proxy = hoxy.createServer({certAuthority: {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./crt.pem')
  }}).listen(8090);
  console.log("Listening on 8090");
  proxy.intercept({
    phase: 'request'
  }, function(req, resp, cycle) {
    console.log(req.url);
  });
});
