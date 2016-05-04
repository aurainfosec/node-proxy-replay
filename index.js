var hoxy = require('hoxy');
var proxy;
var readline = require('readline');
var fs = require('fs');
var request = require('superagent');

const rl = readline.createInterface({
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

  proxy.intercept({
    phase: 'request'
  }, function(req, resp, cycle) {
    request(req.method, req.protocol + '//' + req.hostname + req.url)
    //.send({ name: 'Manny', species: 'cat' })
    .set('Cookie', cookie)
    .end(function(err, res){
      console.log(res.statusCode);
    });

    /*

      headers:
      { host: 't.com',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:43.0) Gecko/20100101 Firefox/43.0 Iceweasel/43.0.4',
        'accept-language': 'en-US,en;q=0.5',
        'accept-encoding': 'gzip, deflate',
        connection: 'keep-alive' },
     protocol: 'http:',
     hostname: 't.com',
     method: 'GET',
     url: '/',

  */

  });
});
