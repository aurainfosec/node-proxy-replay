# node-proxy-replay
Proxy to re-execute a new request with a set of custom headers.

## Installation
Requires NodeJS + NPM

```npm install```

Create the key
```openssl genrsa -out ./key.pem 2048```

Create the certificate
```$ openssl req -x509 -new -nodes -key ./key.pem -days 1024 -out ./crt.pem -subj "/C=US/ST=/L=/O=Node Proxy/CN=auranodeproxy.com"```

Note: this is still under development and not fully functional yet.

TODOs:
 - ability to specify listening port
 - ability to inject custom values when posting form data (ex: anti csrf tokens, even tho some frameworks like Rails allows to specify this in a header)

 ## Contributing

 1. Fork it ( https://github.com/aurainfosec/node-proxy-replay/fork )
 2. Create your feature branch (`git checkout -b my-new-feature`)
 3. Commit your changes (`git commit -am 'Add some feature'`)
 4. Push to the branch (`git push origin my-new-feature`)
 5. Create a new Pull Request

 Thanks
