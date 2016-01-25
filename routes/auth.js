var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');
var authController = require('../controllers/auth');

// Create endpoint handlers for /auth/login
router.route('/signup')
  .post(userController.postUser);

router.route('/users')
  .get(userController.getUsers);

router.route('/auth/login')
	.post(authController.login, function(req, res) {
		
		if(!req.user) { res.json({success:false}); }

		var token = authController.genToken(req.user);

		res.json({success:true, access_token: token});
	});


module.exports = router;
