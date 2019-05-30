import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
