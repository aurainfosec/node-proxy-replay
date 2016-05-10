# node-proxy-replay
Proxy to re-execute a new request with a set of custom headers.

## Installation
Requires NodeJS + NPM

```npm install```

Create the key

```openssl genrsa -out ./key.pem 2048```

Create the certificate

```openssl req -x509 -new -nodes -key ./key.pem -days 1024 -out ./crt.pem -subj "/C=US/ST=/L=/O=Node Proxy/CN=auranodeproxy.com"```

Import the certificate in trusted certificates.


### NOTE:
This is still under development and might be not 100% reliable. Please contribute back for issues or features.

### TODOs:
 - getting this error when proxying to certain sites. unsure if something to do with websockets, didn't find a solution yet.

 ```
 Error: socket hang up
    at createHangUpError (_http_client.js:250:15)
    at Socket.socketOnEnd (_http_client.js:342:23)
    at emitNone (events.js:91:20)
    at Socket.emit (events.js:185:7)
    at endReadableNT (_stream_readable.js:926:12)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)
 ```

 - ability to inject custom values when posting form data (ex: anti csrf tokens, even tho some frameworks like Rails allows to specify this in a header)
 - ability to reply the same request with multiple modified headers

 ## Contributing

 1. Fork it ( https://github.com/aurainfosec/node-proxy-replay/fork )
 2. Create your feature branch (`git checkout -b my-new-feature`)
 3. Commit your changes (`git commit -am 'Add some feature'`)
 4. Push to the branch (`git push origin my-new-feature`)
 5. Create a new Pull Request

 Thanks
