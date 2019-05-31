<template>
    <div class="container">
      <div class="header">个人中心的头部</div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.$store.state.loginState === 'ok') {
        vm.$router.push('/user/login')
      } else {
        vm.$router.push('/user/nologin')
      }
    })
  },
  beforeRouteUpdate: function (to, from, next) {
    if (to.path === '/user/nologin') {
      next()
    }
    if (to.path === '/user/login') {
      next()
    }
  }
}
</script>
