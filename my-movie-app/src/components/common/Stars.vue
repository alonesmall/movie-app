<template>
    <div class="te">

        <ul class="star">
            <li v-for="(item, index) in starArr" :key="index">
                <i class="iconfont icon-pingfenwujiaoxing"></i>
            </li>
        </ul>
        <div class="myscore">
            <slot></slot>
        </div>
    </div>
    <!-- :class="[item == 0 ? starIcon[1] : starIcon[0]]"> -->
</template>

<script>
export default {
  data: function () {
    return {
      starArr: [], // 星级平分需要处理的数组
      starIcon: ['icon-pingfenwujiaoxing-copy', 'icon-pingfenwujiaoxing']
      // 需要的星星图片class名
    }
  },
  methods: {
    // 处理平分所对应的的星级
    starLevel (evaluate) {
    //   let starGrade = Math.floor(evaluate / 2) // 平分为10分，星级只有五级，需要处理
      for (let i = 0; i < 4; i++) {
        this.starArr.push(1)
        // 如果i小于当前评分，则为满星，否则为不满
      }
    }
  },
  mounted: function () {
    // 父组件传来评分，就立即评星级
    if (this.grade) {
      this.starLevel(this.grade)
    }
  },
  props: ['grade'] // 父组件传来的频分参数
}
</script>
