//FIXME => REDUNTANT REDIS
//FIXME => REMOVE COOKIE or SECURITY IT

var User = require('../models/user.js');
var Admin = require('../models/admin.js');

exports._ = function(req, res){
  res.render('index');
};

exports.plan = function(req, res){
  // validations
  var json = {
    name: req.body.name.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ').toUpperCase(), //fulltrim
    email: req.body.email,
    phones: req.body.phones,
    type: req.body.type,
    ages: req.body.ages
  };

  User.save(json,function(err){
    if (err){
      console.log ('Error on save!' + errSave);
      res.send({code:500});
    }else{
      res.send({code:200});
    }    
  });
};
  
exports.main = function(req, res){
  User.all(function(docs){
    res.render('admin/main', { response: docs });
  });
};

exports.index = function(req, res){
  if(req.session.user_id){
    res.redirect('admin/main');
  }else{
    res.render('admin/index',{error:false});
  }
};

exports.login = function(req, res){
  Admin.login(req.body.user, req.body.pass, function(docs){
    if(docs.length==1){
      req.session.user_id = docs[0]._id;
      req.session.cookie.maxAge = 3600000;//1hour!
      res.redirect('admin/main');
    }else{
      res.render('admin/index',{error:true});
    }
  });
};

exports.logout = function(req, res){
  delete req.session.user_id;
  delete req.session.access;
  res.redirect('/admin');
};

exports.plans = function(req, res){
  res.render('plan');
};

exports.delUser = function(req, res){
  if(req.body.ids.length>0) User.removeIds(req.body.ids);
  res.send({status:200});
};
