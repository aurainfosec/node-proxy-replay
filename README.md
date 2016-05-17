# node-proxy-replay
Proxy to re-execute a new request with a set of custom headers.

Installation
Requires NodeJS + NPM

- npm install
- Create the key
  $ openssl genrsa -out ./key.pem 2048
- Create the cert
  $ openssl req -x509 -new -nodes -key ./key.pem -days 1024 -out ./crt.pem -subj "/C=US/ST=/L=/O=Node Proxy/CN=auranodeproxy.com"


Note: this is still under development and not fully functional yet.

TODOs:
 - ability to specify listening port
 - ability to inject custom values when posting form data (ex: anti csrf tokens, even tho some frameworks like Rails allows to specify this in a header)
