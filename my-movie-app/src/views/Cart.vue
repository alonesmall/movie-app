<template>
    <div class="container">
      <div class="header">购物车头部</div>
      <div class="content">购物车内容区</div>
    </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    // if (to.name === 'cart') {
    //   if (localStorage.getItem('isLogin') === 'ok') {
    //     next()
    //   } else {
    //     next('/mylogin')
    //   }
    // }
    next(vm => {
      if (vm.$store.state.loginState === 'ok') {
        next()
      } else {
        next('/mylogin')
      }
    })
  }
}
</script>
