var express = require('express');
var router = express.Router();

var messageController = require('../controllers/message');

// Create endpoint handlers for /api/message
router.route('/')
  .post(messageController.postMessage);

router.route('/:id')
  .get(messageController.getMessages);
// Create endpoint handlers for /api/message
router.route('/:message_id')
  .get(messageController.getMessage);


module.exports = router;