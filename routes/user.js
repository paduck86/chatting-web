var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

// Create endpoint handlers for /api/user
router.route('/')
  .get(userController.getUser)
  .put(userController.updateUser);

// Create endpoint handlers for /api/user/list
router.route('/list')
  .get(userController.getUserList);

// Create endpoint handlers for /api/user/:id
router.route('/:id')
  .get(userController.getUserById);

module.exports = router;
