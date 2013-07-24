var mongoose = require('mongoose');
// validate = require('mongoose-validator').validate;

var schema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  type: {type: String},
  phones: {
  	home: {type: String},
  	com: {type: String},
  	cel: {type: String}
  },
  ages: {},
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

schema.statics.save = function(json, cb){
  this(json).save(function (errSave) { cb(errSave); });
}

schema.statics.removeIds = function(ids){
  // User.remove().where("_id").in(req.body.ids).exec();
  // User.remove({_id:{$in:req.body.ids}},function(e,d){});
  this.remove({_id:{$in:ids}},function(e,d){});
}

module.exports = mongoose.model('User', schema);
