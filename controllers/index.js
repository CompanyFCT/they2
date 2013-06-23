
/*
 * GET home page.
 */

var User = require('../models/user.js');
var nuuid = require('node-uuid');
var redis=null;

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]); 
} else {
  redis = require("redis").createClient();
}

// var username='xtchamps';
// var pass='morloke!@1513#';

exports._ = function(req, res){
  res.render('index');
};

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
  redis.get("admin", function (err, val) {
    if(val==req.signedCookies.admin && req.signedCookies.admin){
      console.log(req.session);
      users(function(docs){
        res.render('admin/index', { response: docs, logged: true });
      });
    }else{
      res.render('admin/index');
    }
  });
};

exports.login = function(req, res){
  if(req.body.user=='admin' && req.body.pass=='123456'){
    var _uuid=nuuid.v1();
    res.cookie("admin", _uuid, {signed: true}); //vulnerability here.. find other way! ;)
    redis.setex("admin", 600, _uuid);//10min

    res.send({});
  }else{
    res.send({status:404});
  }
};

exports.logout = function(req, res){
  redis.del("admin");
  res.redirect('/admin');
};

//used like callback to retrieve user data
function users(cb){
  User.find(function(err,docs){ /* docs.length==0 => handle */
    if(err){ /* handle errors! */ }
    cb(docs);
  });
}