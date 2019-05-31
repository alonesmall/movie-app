<template>
<div class="box">
  <div class="container">
    <div class="header">注册页面</div>
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="username"
          size="large"
          required
          clearable
          placeholder="请输入手机号"
          :error-message="usernamestate"
        >
          <van-icon :name="usernameIcon" slot="right-icon" size="20px" color="green" />
        </van-field>

        <van-field
          v-model="password"
          size="large"
          type="password"
          placeholder="请输入密码"
          required
          clearable
          :error-message="passwordstate"
        >
          <van-icon :name="passwordIcon" slot="right-icon" size="20px" color="green" />
        </van-field>

        <van-field
          v-model="sms"
          center
          required
          size="large"
          clearable
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="primary" v-on:click="sendCode">发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <van-button type="primary" size="large" v-on:click="register">注册</van-button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import axios from 'axios'
Vue.use(Toast)

export default {
  data: function () {
    return {
      username: '',
      password: '',
      sms: '',
      code: 1 // 获取服务器发送的验证码
    }
  },
  computed: {
    usernamestate: function () {
      if (this.username === '') {
        return ''
      } else if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        return '手机号格式错误，请输入正确的手机号'
      } else {
        return ''
      }
    },
    usernameIcon: function () {
      if (/^1[3456789]\d{9}$/.test(this.username)) {
        return 'passed' // 手机号用户名满足条件，显示成功图标
      } else {
        return ''
      }
    },
    passwordstate: function () {
      // 验证密码规则
      if (this.password === '') {
        return ''
      } else if (!(/^(\w){6,20}$/.test(this.password))) {
        return '密码格式错误，请输入6-20个字母、数字、下划线'
      } else {
        return ''
      }
    },
    passwordIcon: function () {
      if (!(/^(\w){6,20}$/.test(this.password))) {
        return ''
      } else {
        return 'passed'
      }
    }
  },
  methods: {
    sendCode: function () {
      if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        Toast('请输入正确的手机号')
      } else {
        this.getCode() // 手机号正确，并开始请求服务器
      }
    },
    getCode: function () {
      axios.get(`http://www.daxunxun.com/users/sendCode?tel=${this.username}`)
        .then(res => {
          // console.log(res.data)
          if (res.data === 1) {
            Toast('该手机号已注册')
          } else if (res.data === 0) {
            Toast('发送验证码失败，请稍后再试')
          } else {
            this.code = res.data.code
          }
        })
    },
    register: function () {
      if (this.usernameIcon !== 'passed') {
        Toast('请输入正确的手机号码')
        return
      }
      if (this.passwordIcon !== 'passed') {
        Toast('请输入正确的密码')
        return
      }
      if (this.sms !== this.code) {
        this.sms = '' // 清空验证码输入框
        Toast('验证码不正确，请输入正确的验证码')
        return
      }
      this.registerFn()
    },
    // 经过所有的验证之后才让点击请求服务器注册接口Fn表示最终final
    registerFn: function () {
      axios.post('http://www.daxunxun.com/users/register', {
        username: this.username,
        password: this.password
      })
        .then(res => {
          if (res.data === 0) {
            Toast('注册失败')
          } else if (res.data === 2) {
            Toast('该用户已注册')
          } else {
            Toast('注册成功')
            // 注册成功之后，在本地存储登录状态信息
            this.$store.commit('changeLoginState', 'ok')
            // 注册成功之后默认登录状态，跳转到首页
            this.$router.push('/')
          }
        })
    }
  }
}
</script>
