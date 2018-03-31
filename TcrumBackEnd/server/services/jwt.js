//const jwt = require('jwt-simple');
const jwt = require('jwt-simple');
const moment = require('moment');
const KEY = 'clave_secreta_proyecto';
const expirationTime = 600;

exports.createToken = (member) => {
	let payload = {
		id: member.id,
		department_major: member.department_major,
		name: member.name,
		iat: moment().unix(),
		exp: moment().add(expirationTime, 'second').unix
	};

	jwtToken = jwt.encode(payload, KEY);

	return {token: jwtToken, expirationTime: expirationTime};
};