<template>
    <div class="container">
      <div class="header">首页的头部</div>
      <div class="content">
        <div class="banner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannerlist" :key="index">
              <img :src="item" alt=""/>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <prolist v-bind:prolist="prolist"></prolist>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import Prolist from '@/components/common/Prolist'
export default {
  components: {
    'prolist': Prolist
  },
  data: function () {
    return {
      prolist: [],
      bannerlist: []
    }
  },
  mounted: function () {
    /**
     * 请求轮播图图片数据
     * 但是得到的数据地址并不是正确的格式
     * 所以需要遍历所得到的的数据，并进行拼接处理
     * */
    axios.get('http://www.daxunxun.com/banner')
      .then(res => {
        let arr = []
        res.data.map(item => {
          item = 'http://www.daxunxun.com' + item
          arr.push(item)
        })
        this.bannerlist = arr
      })
      .catch(err => {
        console.log(err)
      })
    // 这里是请求电影列表数据
    axios.get('http://www.daxunxun.com/douban')
      .then(res => {
        this.prolist = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss">
.banner {
  height: 2rem;
  background: skyblue;
  img {
    width: 100%;
  }
}
</style>
