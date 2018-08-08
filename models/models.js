var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

var User = mongoose.model('User', userSchema);

var docSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: String,
  createdby: {
    type: Object,
    required: true
  },
  usersCanEdit: [],
})

var Doc = mongoose.model('Doc', docSchema);

module.exports = {User: User, Doc: Doc};
