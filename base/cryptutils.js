var crypto = require('crypto');

function CryptUtils(){}

CryptUtils.md5hex = function(str){
	return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = CryptUtils;