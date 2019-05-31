<template>
    <div class="container">

      <van-nav-bar
        title="首页"
        left-text="返回"
        right-text="按钮"
      >
        <van-icon name="user-o" slot="left" size="24px"/>
        <van-icon name="wap-nav" slot="right" size="24px"/>
      </van-nav-bar>

      <div class="content" id="content">
        <div class="banner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannerlist" :key="index">
              <img :src="item" alt=""/>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!-- auto-fill解决轮播图自动向上被遮盖问题 -->
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
          <prolist v-bind:prolist="prolist"></prolist>
        </mt-loadmore>
      </div>

      <div class="top" v-show="flag" @click="backToTop">
        <van-icon name="upgrade" size="40px" color="red"/>
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
  beforeRouteLeave (to, from, next) {
    // 离开此路由时，获取当前滚动条滚动距离，并存储在localStorage中(本地存储、状态管理器)
    let position = document.getElementById('content').scrollTop
    localStorage.setItem('position', position)
    document.getElementById('content').removeEventListener('scroll', this.scrollTop)
    next()
  },
  watch: {
    $route (newVal) {
      if (newVal.name === 'home') {
        document.getElementById('content').scrollTop = localStorage.getItem('position')
      }
    }
  },
  methods: {
    backToTop: function () {
      document.getElementById('content').scrollTop = 0
    },
    scrollTop: function () {
      if (document.getElementById('content').scrollTop < 400) {
        this.flag = false
      } else {
        this.flag = true
      }
    },
    // 下拉时，触发下拉函数，其实就是加载第一页的数据，重新请求
    loadTop: function () {
      axios.get('http://www.daxunxun.com/douban')
        .then(res => {
          this.pageCode = 1 // 当触发下拉刷新函数时，就是渲染第一页的数据，所以需要充值页码pageCode，以及allLoaded
          this.allLoaded = false // 数据是否请求完成
          this.prolist = res.data
          // 请求数据完成之后需要设置重定位，即更新列表的高度
          this.$refs.loadmore.onTopLoaded()
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadBottom: (function () {
      let timer = null
      return function () {
        let that = this
        clearTimeout(timer)
        timer = setTimeout(function () {
          // 上拉加载更多，其实就是查找第pageCode页码的数据并合并到之前的prolist数组中
          axios.get(`http://www.daxunxun.com/douban?start=${that.pageCode * 20}&count=20`)
            .then(res => {
              if (res.data.length === 0) { // 如果查询的到数组为空，则说明所有数据加载完毕，修改allLoaded的值，让其为true,告诉插件没有数据了
                that.allLoaded = true
              } else {
                that.pageCode++
                that.prolist = that.prolist.concat(...res.data)
              }
              that.$refs.loadmore.onBottomLoaded()
            })
            .catch(err => {
              console.log(err)
            })
        }, 1000)
      }
    })()
  },
  data: function () {
    return {
      prolist: [],
      bannerlist: [],
      allLoaded: false,
      pageCode: 1, // 页码默认显示第一页，从第几页开始查询，所以需要后端给的接口要有start接口从哪里开始查找多少条(count接口)数据
      btnFlag: '',
      flag: false
    }
  },
  mounted: function () {
    document.getElementById('content').addEventListener('scroll', this.scrollTop)
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
.top {
  position:fixed;
  bottom: 60px;
  right: 10px;
  width: 50px;
  height: 50px;
  background: rgba($color: #000000, $alpha: 0.5);
  .van-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 40px;
    height: 40px;
  }
}
</style>
