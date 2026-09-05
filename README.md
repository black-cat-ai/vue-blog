# 个人博客（vue-blog）

基于 **Vue2 + Express + MongoDB** 的前后端分离全栈博客系统，支持 PC / 移动端双端适配。

## 功能特性

- 文章系统：列表分页、分类筛选、关键字搜索、Markdown 渲染、点赞、评论
- 用户系统：注册登录（RSA 加密传输）、JWT 鉴权、头像上传、个人中心
- 创作系统：wangEditor 富文本写作、文章管理
- 实时聊天：Socket.IO 在线聊天室
- 移动端：UA 自动分流、下拉刷新、无限滚动、ActionSheet 评论
- 看板娘：Live2D 桌面宠物

## 技术栈

| 端 | 技术 |
|----|------|
| 前端 | Vue 2、Vue Router、Vuex、Element UI（PC）、Vant（移动端）、axios、Stylus/SCSS |
| 后端 | Node.js、Express、Mongoose、JWT、node-rsa、multer、Socket.IO |
| 工程化 | Vue CLI(webpack4)、路由懒加载、组件按需引入、CDN externals、Gzip、Bundle Analyzer |

## 快速启动

```bash
# 1. 启动 MongoDB 服务（Windows 服务名：MongoDB）
net start MongoDB

# 2. 后端 API（端口 3000）
cd blog-server
npm install
npm start

# 3. 聊天服务（端口 8888，另开终端）
node socket.js

# 4. 前端（端口 8080）
cd vue-blog
npm install
npm run serve
```

或直接双击 `vue-blog/start-all.bat` 一键启动（MongoDB + 后端 + 前端）。

访问入口：http://localhost:8080 （移动端自动跳转 `/#/m/articles`）

## 目录结构

```
├── vue-blog/        # 前端：PC(Element UI) + 移动端(Vant) 双端 Vue 应用
├── blog-server/     # 后端：Express + MongoDB RESTful API + Socket.IO 聊天
└── socket 服务端/   # 早期原生 ws 聊天实现（学习参考）
```

## 打包构建

```bash
cd vue-blog
npm run build    # 产出 dist/（含 .gz 压缩文件），并自动打开打包体积分析器
```

优化手段：路由懒加载、Element/Vant/lodash 按需引入、vue & wangEditor 走 CDN externals、Gzip 压缩、prefetch 移除。
