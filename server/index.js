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

        User.findOne({ username: data.username }, function(err, user) {
          if (err) {
            next(err);
          } else if (user && user.password === data.password){
            next({loggedIn: true, id: user._id})
          } else {
            next({loggedIn: false})
          }
        });
  });

  socket.on('test', function(data, next) {
    console.log('data from client ', data);
    next({responseFromServer: 'Hi'})
  })

  socket.on('getDocs', function(data, next) {
    console.log('data from client in getDocs ', data);
    Doc.find({}, function(err, docs){
      if (err) {
        next({error: err});
      } else {
        next({docs: docs})
      }
    })
  })

  socket.on('createUser', function(data,next) {
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

  socket.on('createDoc', function(data,next) {
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

  socket.on('getSingleDoc', function(data,next) {
    console.log("The document id is ", data);
      Doc.findOne({_id: data.id}, function(err, doc) {
        if (err) {
          next(err);
        } else {
          next({doc: doc})
        }
      });
  })

});


server.listen(1337);
