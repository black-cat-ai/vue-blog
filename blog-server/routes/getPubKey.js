/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2026-07-01 12:45:04
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-07-06 11:40:41
 * @FilePath: \20260701_艾春宏_Node.js_DAY53\blog-server\routes\getPubKey.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const { getPublicKey } = require('../core/rsaControl')
const router = express.Router();
const Key = require('../models/Key');
const assert = require('http-assert');

/*GET /keys */
// router.get('/', async function (req, res, next) {
//   let result = await Key.findOne()
//   res.send(200, {
//     message: 'ok',
//     data: {
//       pubKey: result.content
//     }
//   })
// });

// module.exports = router;

router.get('/', async function (req, res, next) {
  try {
    let pubKey = await getPublicKey() 
    res.send(200, {
      message: 'ok',
      data: { pubKey }
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
