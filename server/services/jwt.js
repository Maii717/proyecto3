const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');


// user: guarda usuario y lo mete dentro de un token
exports.createToken = function(user){
	var payload = {
		sub:  user._id,// id registro
    username: user.username,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30,'days').unix // expiration date
  };
    return jwt.encode(payload, config.TOKEN_SECRET);
  };
