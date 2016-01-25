var express = require('express');
var router = express.Router();

var memoController = require('../controllers/memo');

// Create endpoint handlers for /api/memo
router.route('/')
  .post(memoController.postMemo);

router.route('/list')
  .post(memoController.getMemos);

router.route('/:memo_id')
  .get(memoController.getMemo)
  .put(memoController.putMemo)
  .delete(memoController.deleteMemo);

module.exports = router;