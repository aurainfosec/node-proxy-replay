var input = require('./userInput');
var colors = require('colors');

var rl = require('readline').createInterface({
  input:  process.stdin,
  output: process.stdout
});

function headers(callback){
  rl.question(colors.green('What Header KEY you want to override? (leave blank to finish) '), (key) => {
    if(key === ''){
      rl.close();
      callback();
      return;
    }
    rl.question(colors.green('What VALUE you want to override for Header ' + key + '? '), (val) => {
      input.user['headers'][key] = val;
      console.log(key + ": " + colors.red(val));
      headers(callback);
    });
  });
};

module.exports.init = function(callback){
  rl.question(colors.green('What Domain you want to resend requests to? (ex: google.com,twitter.com . leave blank for all) '), (val) => {
    if(val !== ''){
      input.user["domains"] = val.split(',');
    }
    console.log("Domains: " + colors.red(val));
    headers(callback);
    return;
  });
};
