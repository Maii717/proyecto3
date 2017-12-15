const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
var secret = 'clave_secreta';

// user: guarda usuario y lo mete dentro de un token
exports.createToken = function(user){
	var payload = {
		sub:  user._id,// id registro
		name: user.name,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30,'days').unix // expiration date
  };
    return jwt.encode(payload, secret);
  };
