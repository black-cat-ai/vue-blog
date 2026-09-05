<template>
  <div class="live2d-wrap hidden-md-and-down">
    <div class="live2d-menu">
      <span class="live2d-menu--item"><i class="el-icon-refresh"
           @click="changeModel"></i></span>
      <span class="live2d-menu--item"><i class="el-icon-goods"
           @click="changeTextures"></i></span>
    </div>
    <canvas id="live2d"
            width="280"
            height="250"></canvas>
    <div class="live2d-message" v-show="showMessage">{{ messageText }}</div>
  </div>
</template>

<script>
import '@/static/js/live2d'

// CDN 基础路径（来自 GitHub 仓库 imuncle/live2d）
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/imuncle/live2d@master/'

// 模型列表：本地模型 + CDN 模型
const LOCAL_MODELS = [
  { name: 'tia', path: '/Live2D/Live2D/live2d/model/tia/model.json' },
  { name: 'Pio', path: CDN_BASE + 'model/Pio/model.json' },
  { name: 'haru', path: CDN_BASE + 'model/haru/haru_01.model.json' },
  { name: 'rem', path: CDN_BASE + 'model/rem/model.json' },
  { name: 'shizuku', path: CDN_BASE + 'model/shizuku/shizuku.model.json' },
  { name: '小埋', path: CDN_BASE + 'model/xiaomai/xiaomai.model.json' },
  { name: '加藤惠', path: CDN_BASE + 'model/katou_01/katou_01.model.json' },
  { name: 'miku', path: CDN_BASE + 'model/miku/miku.model.json' },
  { name: '血小板', path: CDN_BASE + 'model/platelet/model.json' },
  { name: 'Epsilon', path: CDN_BASE + 'model/Epsilon2.1/Epsilon2.1.model.json' },
  { name: 'unitychan', path: CDN_BASE + 'model/unitychan/unitychan.model.json' },
  { name: 'wanko', path: CDN_BASE + 'model/wanko/wanko.model.json' }
]

// 换装贴图配置（贴图路径相对于 model.json 所在目录）
// Pio 模型数据来源: github.com/imuncle/live2d — 共 119 套服装
const MODEL_TEXTURES = {
  Pio: [
    'textures/default-costume.png',
    'textures/pajamas-costume.png',
    'textures/school-costume.png',
    'textures/Witch Costume.png',
    'textures/Witch Costume White.png',
    'textures/Witch Costume Special.png',
    'textures/Santa Costume.png',
    'textures/Santa Costume Green.png',
    'textures/Santa 2018 Costume Red.png',
    'textures/Santa 2018 Costume Green.png',
    'textures/Maid Costume.png',
    'textures/Maid Costume Red.png',
    'textures/Bunny Girl Costume.png',
    'textures/Bunny Girl Costume Red.png',
    'textures/Magical Girl Costume Pink.png',
    'textures/Magical Girl Costume Purple.png',
    'textures/Sakura Costume.png',
    'textures/Sakura Costume Navy.png',
    'textures/Sakura Fairy Costume.png',
    'textures/Halloween Costume.png',
    'textures/Dress Costume.png',
    'textures/Dress Costume Brown.png',
    'textures/Party Dress Costume Brown.png',
    'textures/Party Dress Costume Purple.png',
    'textures/Lolita Costume Red.png',
    'textures/Lolita Costume Skyblue.png',
    'textures/Sailor Costume.png',
    'textures/Sailor Costume Black.png',
    'textures/Marine Costume Navy.png',
    'textures/Marine Costume White.png',
    'textures/Qipao Costume Pink.png',
    'textures/Qipao Costume Red.png',
    'textures/Swimsuit 2017 Costume Red.png',
    'textures/Swimsuit 2017 Costume Navy.png',
    'textures/Sukumizu Costume.png',
    'textures/Sukumizu Costume White.png',
    'textures/Frill Bikini Costume Green.png',
    'textures/Frill Bikini Costume Purple.png',
    'textures/Furisode Costume.png',
    'textures/Healer Costume.png',
    'textures/Sorceress Costume.png',
    'textures/Succubus Costume Black.png',
    'textures/Succubus Costume Red.png',
    'textures/Vampire Costume.png',
    'textures/Vampire Costume Real.png',
    'textures/Goddess Costume Pink.png',
    'textures/Goddess Costume White.png',
    'textures/Forest Witch Costume Green.png',
    'textures/Forest Witch Costume Brown.png',
    'textures/Star Witch Costume.png',
    'textures/Star Witch Costume Brown.png',
    'textures/Night Witch Costume Black.png',
    'textures/Night Witch Costume Gray.png',
    'textures/Elementary School Costume Navy.png',
    'textures/Elementary School Costume.png',
    'textures/Kids Costume.png',
    'textures/Kids Costume Navy.png',
    'textures/School 2019 Costume Pink.png',
    'textures/School 2019 Costume Black.png',
    'textures/School 2017 Costume Gray.png',
    'textures/School 2017 Costume Yellow.png',
    'textures/Summer Dress Costume Blue.png',
    'textures/Summer Dress Costume White.png',
    'textures/Winter Coat Costume Pink.png',
    'textures/Winter Coat Costume White.png',
    'textures/Winter Costume.png',
    'textures/Winter Costume White.png',
    'textures/Overalls Costume.png',
    'textures/Overalls Costume White.png',
    'textures/Sporty Hood Costume Black.png',
    'textures/Sporty Hood Costume Blue.png',
    'textures/Turtleneck Costume Red.png',
    'textures/Turtleneck Costume.png',
    'textures/Valentine Costume Brown.png',
    'textures/Valentine Costume Pink.png',
    'textures/Cake Costume Choco.png',
    'textures/Cake Costume Cream.png',
    'textures/Animal Costume.png',
    'textures/Animal Costume Racoon.png',
    'textures/Akiba Idol Costume.png',
    'textures/Nightsky Costume.png',
    'textures/Sinsiroad Costume.png',
    'textures/Sarori Costume.png',
    'textures/Voice Story Costume.png',
    'textures/Tirami1 Costume.png',
    'textures/Hanbok Costume.png',
    'textures/Hanbok Costume Pink.png',
    'textures/Hanbok Costume Red.png',
    'textures/Hanbok Costume Skyblue.png',
    'textures/Hanbok Costume Yellow.png',
    'textures/Priest Costume Junior.png',
    'textures/Priest Costume Senior.png',
    'textures/Shaman Costume Black.png',
    'textures/Shaman Costume Blue.png',
    'textures/Ribbon Dress Costume Red.png',
    'textures/Ribbon Dress Costume Yellow.png',
    'textures/Fall Dress Costume Beige.png',
    'textures/Fall Dress Costume Brown.png',
    'textures/Frill Blouse Costume Green.png',
    'textures/Frill Blouse Costume Red.png',
    'textures/Summer Uniform Costume Blue.png',
    'textures/Summer Uniform Costume Red.png',
    'textures/SFC Uniform Costume Red.png',
    'textures/SFC Uniform Costume Yellow.png',
    'textures/School Costume Red.png',
    'textures/Seifuku',
    'textures/New2015 Costume.png',
    'textures/New2015 Costume Pajamas.png',
    'textures/Whiteday Costume Purple.png',
    'textures/Whiteday Costume Red.png',
    'textures/Winter Coat 2017 Costume Brown.png',
    'textures/Winter Coat 2017 Costume White.png',
    'textures/Winter Fairy Costume Black.png',
    'textures/Winter Fairy Costume Pink.png',
    'textures/Sakura Fairy Costume Real.png'
  ]
}

// 布局修正配置（适配 280×250 画布）
// width 越小模型越缩小，center_y 控制垂直居中
var MODEL_LAYOUTS = {
  haru:      { width: 1.6, center_x: 0, center_y: -0.1 },
  shizuku:   { width: 1.6, center_x: 0, center_y: -0.1 },
  Epsilon:   { width: 1.8, center_x: 0, center_y: -0.1 },
  wanko:     { width: 1.4, center_x: 0, center_y: -0.2 },
  miku:      { width: 1.8, center_x: 0, center_y: -0.1 },
  platelet:  { width: 1.8, center_x: 0, center_y: -0.1 },
  unitychan: { width: 1.8, center_x: 0, center_y: -0.1 },
  Pio:       { width: 1.8, center_x: 0, center_y: -0.1 },
  rem:       { width: 1.8, center_x: 0, center_y: -0.1 },
  '\u52a0\u85e4\u60e0': { width: 1.8, center_x: 0, center_y: -0.1 },
  '\u5c0f\u57cb':  { width: 1.8, center_x: 0, center_y: -0.1 }
}

// 模型配置缓存 { modelName: configObject }
var modelConfigCache = {}

// 判断字符串是否为模型资源文件引用
var FILE_EXT_RE = /\.(mtn|moc|json|png|wav|jpg|svg)$/i

// 递归遍历对象，将所有匹配文件扩展名的字符串值转为绝对路径
function makePathsAbsolute (obj, baseDir) {
  if (!obj || typeof obj !== 'object') return
  var keys = Object.keys(obj)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var val = obj[key]
    if (typeof val === 'string') {
      // 跳过非路径字段
      if (key === 'name' || key === 'id' || val.indexOf('http') === 0) continue
      if (FILE_EXT_RE.test(val)) {
        obj[key] = baseDir + val
      }
    } else if (typeof val === 'object' && val !== null) {
      makePathsAbsolute(val, baseDir)
    }
  }
}

// 应用布局修正
function applyLayoutOverrides (config, modelName) {
  var layout = MODEL_LAYOUTS[modelName]
  if (layout) {
    config.layout = {
      center_x: layout.center_x,
      center_y: layout.center_y,
      width: layout.width
    }
  }
}

// 获取模型目录（URL 中最后一个 / 之前的部分）
function getModelDir (path) {
  return path.substring(0, path.lastIndexOf('/') + 1)
}

// 获取并缓存模型配置（首次 fetch，后续读缓存）
function getCachedConfig (model) {
  if (modelConfigCache[model.name]) {
    return Promise.resolve(modelConfigCache[model.name])
  }
  return fetch(model.path)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return res.json()
    })
    .then(function (config) {
      var modelDir = getModelDir(model.path)
      // 递归转换所有相对路径为 CDN 绝对路径
      makePathsAbsolute(config, modelDir)
      // 应用布局修正
      applyLayoutOverrides(config, model.name)
      // 缓存处理后的配置
      modelConfigCache[model.name] = config
      return config
    })
}

// 预加载下一个模型的配置（静默，失败不影响使用）
function preloadModel (index) {
  var next = LOCAL_MODELS[index]
  if (next && next.path.indexOf('http') === 0 && !modelConfigCache[next.name]) {
    getCachedConfig(next)
  }
}

// 用缓存的配置创建 Blob URL 并加载
function loadFromCache (model) {
  getCachedConfig(model)
    .then(function (config) {
      var blob = new Blob([JSON.stringify(config)], { type: 'application/json' })
      var blobUrl = URL.createObjectURL(blob)
      window.loadlive2d('live2d', blobUrl)
      setTimeout(function () { URL.revokeObjectURL(blobUrl) }, 8000)
    })
    .catch(function () {
      // 降级：直接用原始路径加载
      window.loadlive2d('live2d', model.path)
    })
}

export default {
  name: 'Live2d',
  data () {
    return {
      currentModelIndex: 0,
      currentTextureIndex: 0,
      showMessage: false,
      messageText: '',
      messageTimer: null,
      isLoading: false
    };
  },
  mounted () {
    this.loadModel()
    // 页面加载后预加载下一个模型，首次切换秒响应
    preloadModel(1)
  },
  methods: {
    loadModel () {
      var model = LOCAL_MODELS[this.currentModelIndex]
      if (!model) return
      if (model.path.indexOf('http') === 0) {
        loadFromCache(model)
      } else {
        window.loadlive2d('live2d', model.path)
      }
    },
    changeModel () {
      if (this.isLoading) return
      this.currentModelIndex = (this.currentModelIndex + 1) % LOCAL_MODELS.length
      this.currentTextureIndex = 0
      this.loadModel()
      this.showTips('切换到 ' + LOCAL_MODELS[this.currentModelIndex].name + ' ~')
      // 预加载下下个模型，减少连续切换时的等待
      var nextIdx = (this.currentModelIndex + 1) % LOCAL_MODELS.length
      preloadModel(nextIdx)
    },
    changeTextures () {
      if (this.isLoading) return
      var model = LOCAL_MODELS[this.currentModelIndex]
      var textures = MODEL_TEXTURES[model.name]
      if (!textures || textures.length === 0) {
        this.showTips('该模型暂不支持换装哦~')
        return
      }
      this.isLoading = true
      this.showTips('换装加载中...')
      var self = this
      getCachedConfig(model)
        .then(function (cachedConfig) {
          // 切换到下一套装图
          self.currentTextureIndex = (self.currentTextureIndex + 1) % textures.length
          var newTexture = textures[self.currentTextureIndex]
          var modelDir = getModelDir(model.path)
          // 深拷贝配置，避免修改缓存对象
          var config = JSON.parse(JSON.stringify(cachedConfig))
          config.textures = [modelDir + newTexture]
          // 提取服装名称用于提示
          var costumeName = newTexture.replace(/^textures\//, '').replace(/\.png$/i, '')
          // 创建 Blob URL 并重新加载模型
          var blob = new Blob([JSON.stringify(config)], { type: 'application/json' })
          var blobUrl = URL.createObjectURL(blob)
          window.loadlive2d('live2d', blobUrl)
          setTimeout(function () { URL.revokeObjectURL(blobUrl) }, 8000)
          self.isLoading = false
          self.showTips('换装: ' + costumeName + ' (' + (self.currentTextureIndex + 1) + '/' + textures.length + ')')
        })
        .catch(function () {
          self.isLoading = false
          self.showTips('换装失败，请重试~')
        })
    },
    showTips (text) {
      this.messageText = text
      this.showMessage = true
      clearTimeout(this.messageTimer)
      this.messageTimer = setTimeout(function () {
        this.showMessage = false
      }.bind(this), 3000)
    }
  },
};
</script>

<style lang="stylus" >
.live2d-wrap
  position fixed
  left 0
  bottom 10px
  width 280px
  z-index 999
.live2d-wrap:hover .live2d-menu
  display flex
.live2d-menu
  position absolute
  top 20px
  left 20px
  display none
  flex-direction column
  align-items center
  justify-content space-around
  width 40px
  height 80px
  padding 8px
  background-color #fff
  border-radius 20px
.live2d-menu--item
  padding 4px
  cursor pointer
.live2d-message
  position absolute
  top -60px
  left 20px
  min-width 150px
  padding 8px 12px
  background-color rgba(255, 255, 255, 0.9)
  border-radius 8px
  font-size 13px
  color #333
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.15)
  animation fadeIn 0.3s ease
@keyframes fadeIn
  from
    opacity 0
    transform translateY(10px)
  to
    opacity 1
    transform translateY(0)
</style>