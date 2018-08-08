
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('login', function(data, next) {
    console.log('LOGIN REQUEST', data)
    const {user, pass} = data;

    if (user === 'demi' && pass === 'demi') next({loggedIn: true})
    else next({loggedIn: false})
  });
});

server.listen(1337);
