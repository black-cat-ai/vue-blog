/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2026-07-13 02:40:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-07-13 04:42:23
 * @FilePath: \20260709_艾春宏_Node.js_DAY57\blog-server\models\Like.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({ // Schema 定义数据结构
	article: { //文章
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Article',
		required: true  //必填
	},
	user: {
		type: String,
		required: true
	},
	createdAt: {  //创建时间
		type: Date,
		default: Date.now
	}
})

schema.index({ article: 1, user: 1}, { unique: true })
module.exports = mongoose.model('Like', schema)