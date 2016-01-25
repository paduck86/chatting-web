// package 호출
var jwt = require('jsonwebtoken');
var passport = require('passport');
var request = require("request");
var CustomStrategy = require('passport-custom').Strategy;
var User = require('../models/user');


// 프로퍼티파일
var nconf = require('nconf');
nconf.argv().env();
nconf.file({ file: 'config.json' });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new CustomStrategy(
	function(req, done) {
		User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) {
                return done(err,false);
            }
			// No user found with that username
			if (!user) { return done(null, false); }
			// Make sure the password is correct
			user.verifyPassword(req.body.password, function(err, isMatch) {
				if (err) { return done(err); }
				// Password did not match
		        if (!isMatch) { return done(null, false); }	
				// Success
				return done(null, user);
			});
		});
	}
));
 
exports.login = passport.authenticate('custom');

exports.genToken = function(user) {
	var secret = nconf.get("jwtSecret");

	//var expires = expiresIn(7); // 7 days

	var token = jwt.sign(user, secret);

	return {
	  token: token,
	  //expires: expires,
	  user: user
	};
};

// private methods
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

