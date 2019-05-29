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
  mounted: function () {
    if (localStorage.getItem('userId') === '1') {
      this.$router.push('/user.login')
    } else {
      this.$router.push('/user/nologin')
    }
  }
}
</script>
