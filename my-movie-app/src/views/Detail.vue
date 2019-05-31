<template>
<div class="box">
  <div class="container">
    <van-nav-bar
      title="详情"
      left-arrow
      @click-left="back"
    />
    <div class="content">{{ title }}</div>
  </div>
  <footer class="footer">
    详情页面的底部
  </footer>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    // 获取路由传过来的参数
    let { id } = this.$route.params
    axios.get(`http://www.daxunxun.com/detail?id=${id}`)
      .then(res => {
        this.title = res.data[0].title
      })
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
