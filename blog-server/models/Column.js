/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2026-07-01 12:43:54
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-07-09 21:40:54
 * @FilePath: \20260701_艾春宏_Node.js_DAY53\blog-server\models\Column.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
const { formatDate } = require('../core/util/util')
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
    get (val) {
      return formatDate(new Date(val), 'yyyy年MM月dd日 hh:mm:ss')
    }
  },
  //文章 ids
  aids: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article"
  }],
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
  }
})
schema.set('toJSON', { getters: true })

module.exports = mongoose.model('Column', schema)