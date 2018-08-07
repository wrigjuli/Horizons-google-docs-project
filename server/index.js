// import http from 'http';
//
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
//
// console.log('Server running at http://127.0.0.1:1337/');

// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// server.listen(1337);
// io.on('connection', function (socket) {
//   socket.on('login', function(data, next){
//     const {user, pass} = data;
//     if (user==='Julie' && pass === 'Julie') next({loggedIn: true})
//     else next({ loggedIn: false})
//   })
//   socket.emit('msg', { hello: 'world' });
//   socket.on('cmd', function (data) {
//     console.log(data);
//   });
// });

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.on('login', function (data, next) {
    console.log('LOGIN REQUEST', data)
    const {user, pass} = data;

    if(user === 'demi' && pass === 'demi') next({loggedIn: true})
    else next({loggedIn: false})
  });
});

server.listen(1337);
