<template>
<div class="box">
  <div class="container">
    <div class="header">详情头部</div>
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
    console.log(this.$route)
    axios.get(`http://www.daxunxun.com/detail?id=${id}`)
      .then(res => {
        this.title = res.data[0].title
      })
  }
}
</script>
