var input = require('./userInput');
var colors = require('colors');

var rl = require('readline').createInterface({
  input:  process.stdin,
  output: process.stdout
});

function port(callback){
  rl.question(colors.green('Which port you want the proxy to listen to? (leave blank for 8090) '), (port) => {
    if(port === ''){
      port = 8090;
    }
    else{
      port = parseInt(port);
      if(port <= 0 || port > 65535){
        port = 8090;
      }
    }
    rl.close();
    callback(port); // start the proxy
    return;
  });
}

function headers(callback){
  rl.question(colors.green('What Header KEY you want to override? (leave blank to finish) '), (key) => {
    if(key === ''){
      requestBody(callback);
      return;
    }
    rl.question(colors.green('What VALUE you want to override for Header ' + key + '? '), (val) => {
      input.user['headers'][key] = val;
      console.log(key + ": " + colors.red(val));
      headers(callback);
    });
  });
};

function requestBody(callback){
  rl.question(colors.green('What Body Parameter KEY you add or override? (leave blank to finish) '), (key) => {
    if(key === ''){
      port(callback); // ask user which port to listen
      return;
    }
    rl.question(colors.green('What VALUE you want to override for this Parameter ' + key + '? '), (val) => {
      input.user['bodyParams'][key] = val;
      console.log(key + ": " + colors.red(val));
      requestBody(callback);
    });
  });
};

module.exports.init = function(callback){
  rl.question(colors.green('What Domain you want to resend requests to? (ex: google.com,twitter.com . leave blank for all) '), (val) => {
    if(val !== ''){
      input.user["domains"] = val.split(',');
    }
    console.log("Domains: " + colors.red(val));
    headers(callback); // ask user which header to set or override, and which port to listen
    return;
  });
};
