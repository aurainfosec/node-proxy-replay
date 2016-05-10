var input = require('./userInput');
var colors = require('colors');
var sqlite3 = require('sqlite3').verbose();
var headers = require('./headers');
var request = require('superagent');

var db = new sqlite3.Database('./sqlitedb');
db.serialize(function(){
  db.run("DROP TABLE requests;") // make sure all previous session data is cleared
  db.run("CREATE TABLE requests (id INTEGER, request_method TEXT, request_url TEXT, request_headers BLOB, response_code INTEGER, response_body BLOB);");
});

var replyThis = function(req){
  return (input.user["domains"].length === 0 || input.user["domains"].indexOf(req.hostname) > -1) &&
  (
    req.headers.accept.indexOf('html') > -1 ||
    req.headers.accept.indexOf('xml')  > -1 ||
    req.headers.accept.indexOf('json') > -1
  )
};

var id = 0;

module.exports.reply = function(req){
  if(replyThis(req)){
    var method = req.method;
    var url = req.protocol + '//' + req.hostname + req.url
    var modHeaders = headers.editRequestHeaders(req);
    var body = req.string;
    request(method, url)
    .set(modHeaders)
    .send(body)
    .end(function(err, res){
      if(typeof res !== 'undefined'){
        id++;
        console.log(colors.green(id) + ") " + colors.red(method) + "  " + (req.hostname + req.url).underline + "  " + colors.green(res.statusCode));
        db.run("INSERT INTO requests VALUES (?, ?, ?, ?, ?, ?)", id, method, url, JSON.stringify(modHeaders), res.statusCode, res.text);
        console.log("");
      }
    });
  }
};
