const http = require('http');
const handler = require('./rt1');


const server = http.createServer(handler);

server.listen(3000);