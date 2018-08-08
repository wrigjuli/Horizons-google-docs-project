var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var models = require('../models/models');
var User = models.User;
var Doc = models.Doc;

mongoose.connect(process.env.MONGODB_URI);

io.on('connection', function (socket) {
  socket.on('login', function (data, next) {
    console.log('LOGIN REQUEST', data)
    const {user, pass} = data;

    if (user === 'demi' && pass === 'demi') next({loggedIn: true})
    else next({loggedIn: false})
  });
  socket.on('createDocument', function(data, next) {
    console.log('data from client ', data);
    next({responseFromServer: 'Hi'})
  })

  socket.on('testUser', function(data,next) {
    console.log("username and password from client", data);

    var user = new User({
      username: data.username,
      password: data.password
    })

    user.save(function(err) {
      if(err) {
        next({saved: false, error: err})
      } else {
        next({saved: true})
      }
    })
  })

  socket.on('testDoc', function(data,next) {
    console.log("document info from client", data);

    var doc = new Doc({
      title: data.title,
      body: data.body,
      createdby: data.createdby
    })

    doc.save(function(err) {
      if(err) {
        next({saved: false, error: err})
      } else {
        next({saved: true})
      }
    })
  })

});

// app.post('/testUser', function(req, res){
//   console.log("username is :", username, " password is: ", password);
//   var user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });
  // user.save(function(err) {
  //   if(err) {
  //     res.status(500).json(err);
  //   } else {
  //     res.status(200).json({"success": true})
  //   }
  // })
// })

server.listen(1337);
