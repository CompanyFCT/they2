var mongoose = require('mongoose'),
CryptUtils = require('../base/cryptutils.js');

var schema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  user: {type: String},
  pass: {type: String},
  when: {type: Date, default: Date.now, required: true}
});

// login
schema.statics.login = function(u,p,cb){
  this.find({$and : [{user:u} , {pass:CryptUtils.md5hex(p)}] }, function(err,docs){ cb(docs); });
}

module.exports = mongoose.model('Admin', schema);

