var mongoose = require('mongoose');
var crypto = require('crypto');

var schema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  user: {type: String},
  pass: {type: String},
  when: {type: Date, default: Date.now, required: true}
});

// login
schema.statics.login = function(u,p,cb){
  var encP=crypto.createHash('md5').update(p).digest("hex");
  this.find({$and : [{user:u} , {pass:encP}] }, function(err,docs){ cb(docs); });
}

module.exports = mongoose.model('Admin', schema);

