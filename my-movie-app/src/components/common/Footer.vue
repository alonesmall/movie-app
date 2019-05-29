<template>
    <div class="footer">
        <ul>
            <router-link to="/home" tag="li">
                <span class="iconfont icon-shouye"></span>
                <p>首页</p>
            </router-link>
            <router-link to="/kind" tag="li">
                <span class="iconfont icon-tubiao113"></span>
                <p>分类</p>
            </router-link>
            <router-link to="/cart" tag="li">
                <span class="iconfont icon-gouwuche"></span>
                <p>购物车</p>
            </router-link>
            <router-link to="/user" tag="li">
                <span class="iconfont icon-gerenzhongxin"></span>
                <p>我的</p>
            </router-link>
        </ul>
    </div>
</template>

<style lang="scss">
@import '@/lib/reset.scss';
ul{
    li{
        span{
            @include rect(auto, 0.24rem);
        }
        p {
            @include font-size(0.12rem);
        }
    }
}
</style>
