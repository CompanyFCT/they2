var mongoose = require('mongoose'),
validate = require('mongoose-validator').validate;

var schema = new mongoose.Schema({
  name: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 50)},
  email: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 50)},
  phone: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 15)},
  when: {type: Date, default: Date.now, required: true}
});

//get all
//schema.methods.all = function(cb){
//  return User.find(function(err,docs){ /* docs.length==0 => handle */
//    if(err){ /* handle errors! */ }
//    cb(docs);
//  });
//w}

module.exports = mongoose.model('User', schema);

