var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName: {
    type: String,
    unique: true,
    required: true
  },

  userName: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  emailAddress: {
    type: String,
    required: true
  },

  eventsScheduled: [{
    type: Schema.ObjectId,
    ref: 'League'
  }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;