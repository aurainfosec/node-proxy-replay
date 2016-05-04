module.exports.editRequestHeaders = function(req, cookie){ // TODO - tidy up this function...
  var newHeaders = {};
  for(var val in req.headers){
    if(val.toLowerCase() === 'cookie'){
      newHeaders['cookie'] = cookie;
    }else{
      newHeaders[val] = req.headers[val];
    }
  }
  if(typeof newHeaders['cookie'] === 'undefined'){
    newHeaders['cookie'] = cookie;
  }
  return newHeaders;
}
