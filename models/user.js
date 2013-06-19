var mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  when: {type: Date, default: Date.now, required: true}
}));