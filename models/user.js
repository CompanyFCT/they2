var mongoose = require('mongoose'),
validate = require('mongoose-validator').validate;

var schema = new mongoose.Schema({
  name: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 50)},
  email: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 50)},
  phone: {type: String, required: true, validate: validate({message: "Exceeded maxlength"}, 'len', 5, 15)},
  when: {type: Date, default: Date.now, required: true}
});

// Get all users
schema.statics.all = function(cb){
 return this.find(function(err,docs){
 	 // docs.length==0 => handle 
   if(err) {}// handle errors! 
   else{cb(docs);} 
 });
}

module.exports = mongoose.model('User', schema);

