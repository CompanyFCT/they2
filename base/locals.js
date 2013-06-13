exports.setLocals = function(req, res, next){ //<- middleware function
  //TODO SEE ASYNC LIB

  url = function(path) {
    return scheme() + url_no_scheme(path);
  }

  host = function(){
    return req.headers['host'];
  }

  scheme = function(){
    return req.headers['x-forwarded-proto'] || 'http';
  }

  url_no_scheme = function(path) {
    return '://' + host() + (path || '');
  }

  // pagination = function(count, resultsPerPage, currentPage){
    // "express-pagination": "0.0.5"
  //   return (require('express-pagination').paginate)(count, resultsPerPage, currentPage);
  // }

  next();
}
