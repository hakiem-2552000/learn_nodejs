'use strict';

var http = require('http');
var port = 3001;

var server = http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.write('IP address: ' + request.socket.remoteAddress);
    response.end();
}).listen(port);

console.log('Server is running on port: ' + port);