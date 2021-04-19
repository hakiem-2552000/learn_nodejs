const server = require('http').createServer()
const io = require('socket.io')(server)
const express = require('express');
const app = express();

io.on('connection', function (client) {

  console.log('client connect...', client.id);

  client.on('typing', function name(data) {
    console.log(data);
    io.emit('typing', data)
  })

  client.on('message', function name(data) {
    console.log(data);
    io.emit('message', data)
  })

  client.on('location', function name(data) {
    console.log(data);
    io.emit('location', data);
  })

  client.on('connect', function () {
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

app.get('/',(request, response)=>{
    response.status(200);
    response.send('Happy lunar new year');
});
var server_port = process.env.PORT || 8080;
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('Listening on port %d', server_port);
});
