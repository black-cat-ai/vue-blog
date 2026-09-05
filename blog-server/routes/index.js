var express = require('express');
var router = express.Router();
const assert = require('http-assert');

/* GET index - check login status */
router.get('/', async function (req, res, next) {
  // Global expressJwt middleware already handles JWT verification
  // and sets req._id and req.isPass
  try {
    assert(req.isPass, 401, '请先登录')
    res.send(200, {
      message: 'ok',
      data: { isLogin: true }
    });
  } catch (err) {
    next(err)
  }
});

module.exports = router;