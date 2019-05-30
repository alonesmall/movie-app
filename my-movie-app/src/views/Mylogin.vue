<template>
  <div class="container">
    <div class="header">登录页面</div>
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          size="large"
          placeholder="请输入用户名"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          size="large"
          clearable
          required
        />
      </van-cell-group>
    </div>
    <van-button type="info" size="large" v-on:click="login">登录</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
Vue.use(Toast)

export default {
  data: function () {
    return {
      username: '',
      password: '',
      code: 1
    }
  },
  methods: {
    login: function () {
      if (this.username === '') {
        Toast('用户名不能为空')
        return
      }
      if (this.password === '') {
        Toast('密码不能为空')
        return
      }
      this.goLogin()
    },
    goLogin: function () {
      axios.post('http://www.daxunxun.com/users/login', {
        username: this.username,
        password: this.password
      })
        .then(res => {
          // console.log(res.data)
          if (res.data === 0) {
            Toast('登录失败，请稍后再试')
            return
          }
          if (res.data === -1) {
            Toast('密码错误，请输入正确的密码')
            return
          }
          if (res.data === 2) {
            Toast('不存在此用户，请重新输入')
            return
          }
          if (res.data === 1) {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>
