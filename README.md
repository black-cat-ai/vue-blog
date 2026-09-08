# 个人博客（vue-blog）

Vue2 + Express + MongoDB 前后端分离博客系统。

## 启动

### 一键启动（Windows）

双击 `vue-blog/start-all.bat`，自动启动 MongoDB、后端、前端。

关闭服务：双击 `vue-blog/stop-all.bat`。

### 手动启动

```bash
# 1. 启动 MongoDB 服务（Windows）
net start MongoDB

# 2. 后端 API（端口 3000）
cd blog-server
npm install
npm start

# 3. 聊天服务（端口 8888，另开一个终端）
cd blog-server
node socket.js

# 4. 前端（端口 8080）
cd vue-blog
npm install
npm run serve
```

## 访问地址

- 前端：http://localhost:8080
- 后端 API：http://127.0.0.1:3000
