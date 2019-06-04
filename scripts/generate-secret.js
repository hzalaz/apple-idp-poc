var jwt = require('jsonwebtoken');
var fs = require('fs');

var privateKey = fs.readFileSync(process.argv[2]);
var token = jwt.sign({}, privateKey, { algorithm: 'ES256', expiresIn: '2 days', audience: 'https://appleid.apple.com', issuer: 'UUWS9Z463H', subject: 'com.overmind.apple-login-poc-web' });

console.log('Token is ', token);