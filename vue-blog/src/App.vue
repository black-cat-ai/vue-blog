<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created () {
    // if (this.$route.name !== 'index') {
    //   this.$router.push('/index')
    // }
  },
  mounted () {
    this._redirectByDevice()
    window.addEventListener('resize', this._onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this._onResize)
  },
  methods: {
    _isMobile () {
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/)
    },
    _isMobileViewport () {
      return window.innerWidth < 768
    },
    _redirectByDevice () {
      let isMobile = this._isMobile() || this._isMobileViewport()
      let currentIsMobile = this.$route.path.startsWith('/m')
      if (isMobile && !currentIsMobile) {
        this.$router.replace('/m')
      } else if (!isMobile && currentIsMobile) {
        this.$router.replace('/')
      }
    },
    _onResize () {
      clearTimeout(this._resizeTimer)
      this._resizeTimer = setTimeout(() => {
        this._redirectByDevice()
      }, 300)
    }
  }
}
</script>

<style lang="stylus">
html, body
  overflow hidden
  height 100vh
</style>
