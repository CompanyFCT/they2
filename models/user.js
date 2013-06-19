var mongoose = require('mongoose'),
validate = require('mongoose-validator').validate;

module.exports = mongoose.model('User', new mongoose.Schema({
  name: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 50)},
  email: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 50)},
  phone: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 15)},
  when: {type: Date, default: Date.now, required: true}
}));