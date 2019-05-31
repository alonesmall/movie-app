import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Kind from './views/Kind.vue'
import Cart from './views/Cart.vue'
import User from './views/User.vue'
import Userlogin from '@/components/user/Login.vue'
import Usernologin from '@/components/user/Nologin.vue'
import Footer from '@/components/common/Footer.vue'
import Detail from './views/Detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mylogin',
      name: 'mylogin',
      components: {
        default: () => import('./views/Mylogin.vue')
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        default: () => import('./views/Register.vue')
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      components: {
        default: Detail
      }
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default: Home,
        footer: Footer
      },
      meta: { keepAlive: true }
    },
    {
      path: '/kind',
      name: 'kind',
      components: {
        default: Kind,
        footer: Footer
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        default: Cart,
        footer: Footer
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        default: User,
        footer: Footer
      },
      children: [
        {
          path: 'login',
          component: Userlogin
        },
        {
          path: 'nologin',
          component: Usernologin
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
