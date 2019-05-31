<template>
<div>
  <button @click="gologin">登录</button> / <button @click="goregister">注册</button>
</div>
</template>

<script>
export default {
  methods: {
    gologin () {
      this.$router.push('/mylogin')
    },
    goregister () {
      this.$router.push('/register')
    }
  }
}
</script>
