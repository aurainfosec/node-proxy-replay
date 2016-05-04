module.exports.editRequestHeaders = function(req, cookie){
  var newHeaders = {};
  for(var val in req.headers){
    if(val.toLowerCase() === 'cookie'){
      newHeaders['Cookie'] = cookie;
    }else{
      newHeaders[val] = req.headers[val];
    }
  }
  return newHeaders;
}
