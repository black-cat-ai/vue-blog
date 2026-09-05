/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2026-07-01 12:43:34
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-07-13 04:56:45
 * @FilePath: \20260709_艾春宏_Node.js_DAY57\blog-server\routes\artLikes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const Article = require('../models/Article')
const Like = require('../models/Like')


/*post 文章点赞 */
router.post('/:id', async (req, res, next) => {
  let articleId = req.params.id
	//获取用户区分标识 登录用户用 _id，游客用 visitorId
	let userId = req._id || req.body.visitorId
	
	if (!userId) {
		return res.send(400, { message: '非标识用户'})
	}
	userId = String(userId)

  try {
		// 先看是否点赞
		let existing = await Like.findOne({ article:articleId, user: userId})
		if(existing) { //如果存在 再次点击就取消
			await Like.deleteOne({ _id: existing._id}) //删除点赞用户id
			await Article.findByIdAndUpdate(articleId, { //返回点赞前旧数据 删除后点赞计数减一
				$inc: { 
					like_num: -1
				}}) 
			let article = await Article.findById(articleId) //重新查询文章 最新值
			res.send(200, { //返回点赞数与点赞状态isLiked
				message: '取消点赞',
				data: {likes: article.like_num, isLiked: false}
			})			
		} else { //如果未点赞则点上
			await Like.create({ article: articleId, user: userId})
			await Article.findByIdAndUpdate(articleId, {
				$inc: { //monggoDB递增操作符
					 like_num: 1
				}})
			let article = await Article.findById(articleId)
			res.send(200, { 
				message: '点赞成功',
				data: {likes: article.like_num, isLiked: true} 
			})
		}
	} catch (err) {
		next(err)
	}
})
		
  //   let result = await Article.findByIdAndUpdate(id, {
  //     $inc: {
  //       like_num: 1
  //     }
  //   })
  //   let likes = ++result.like_num  怎么一直加
  //   res.send(200, {
  //     message: '点赞成功',
  //     data: {
  //       likes
  //     }
  //   })
  // } catch (err) {
  //   next(err)
  // }

// GET /:id  查询当前用户是否已点赞
router.get('/:id', async (req, res, next) => {
  let articleId = req.params.id //从URL获取文章ID
  let userId = req._id || req.query.visitorId //获取用户标识
  
  if (!userId) {
    return res.send(200, { data: { isLiked: false } })
  }
  userId = String(userId)
  
  try {
		//查询 文章 用户 的记录是否存在
    let existing = await Like.findOne({ article: articleId, user: userId })
    res.send(200, {
      data: { isLiked: !!existing } //双重取反，如果为null则false如果有数据则为ture
    })
  } catch (err) {
    next(err)
  }
})


module.exports = router;