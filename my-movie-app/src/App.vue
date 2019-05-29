<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '/lib/reset.scss';
html, body, #app, .box {
  @include rect(100%, 100%);
}

#app, .box {
  @include flexbox();
  @include flex-direction(column);
  .container{
    @include flexbox();
    @include flex();
    @include rect(100%, auto);
    @include flex-direction(column);
  }
  .header {
    @include rect(100%, 0.44rem);
    @include background-color(#f66);
  }

  .content {
    @include flex();
    @include rect(100%,auto);
    @include overflow();
  }

  .footer {
    @include rect(100%, 0.5rem);
    @include background-color(#ccc);
    ul{
      @include rect(100%, 100%);
      @include flexbox();
      li {
        &.router-link-active {
          @include text-color(#f66);
        }
        @include flex();
          //弹性盒水平垂直居中
          @include rect(auto, 100%);
          @include flexbox();
          @include flex-direction(column);
          @include justify-content();
          @include align-items();
      }
    }
  }
}
</style>
