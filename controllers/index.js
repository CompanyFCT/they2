
/*
 * GET home page.
 */

var User = require('../models/user.js');
var redis=null;

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]); 
} else {
  redis = require("redis").createClient();
}


// redis = require("redis").createClient(6379,"127.0.0.1");

// var username='xtchamps';
// var pass='morloke!@1513#';

exports._ = function(req, res){
  res.render('index');
};

// logged = function() {
//     redis.get("logged", function (err, res) {
//       return res;
//     });
// }

exports.plan = function(req, res){
  // validations
  var json = {
    name: req.body.name.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ').toUpperCase(), //fulltrim
    email: req.body.email,
    phone: req.body.phone
  };
  
  new User(json).save(function (errSave) {
    if (errSave){
      console.log ('Error on save!' + errSave); 
      res.send({code:500});
    }else{
      res.send({code:200});
    }
  });
};

exports.admin = function(req, res){
  redis.get("logged", function (err, val) {
    if(val==null){
      res.render('admin/index');
    }else{
      users(function(docs){
        res.render('admin/index', { response: docs, logged: true });
      });
    }
  });
};

exports.login = function(req, res){
  if(req.body.user=='admin' && req.body.pass=='123456'){
    redis.set("logged", true);
    res.send({});
  }else{
    res.send({status:404});
  }
};

exports.logout = function(req, res){
  redis.del("logged");
  res.redirect('/admin');
};

//used like callback to retrieve user data
function users(cb){
  User.find(function(err,docs){ /* docs.length==0 => handle */
    if(err){ /* handle errors! */ }
    cb(docs);
  });
}