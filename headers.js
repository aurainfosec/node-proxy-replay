module.exports.editRequestHeaders = function(req, cookie){ // TODO - tidy up this function...
  var newHeaders = {};
  for(var val in req.headers){
    if(val.toLowerCase() === 'cookie'){
      newHeaders['Cookie'] = cookie;
    }else{
      newHeaders[val] = req.headers[val];
    }
  }
  if(typeof newHeaders['Cookie'] === 'undefined'){
    newHeaders['Cookie'] = cookie;
  }
  return newHeaders;
}
