<template>
    <ul class="prolist">
        <li @click="goDetail(item.id)" v-for="item in prolist" :key="item.id">
            <div class="img">
                <img :src="item.images.small" :alt="item.alt"/>
            </div>
            <div class="info">
                <h4>{{ item.title }}</h4>
            </div>
            <my-star :grade="item.rating.average">
                {{ item.rating.average }}
            </my-star>
        </li>
    </ul>
</template>
// router-link tag="li" :to="{name: 'detail', params: {id: item.id}}"
<style lang="scss">
@import '@/lib/reset.scss';
.prolist{
    overflow: hidden;
    li {
        float: left;
        @include margin(5px 1% 0);
        @include rect(48%, 2.3rem);
        border: 0.01rem solid #000;
        .img {
            @include rect(100%, 1.76rem);
            img {
                @include rect(100%, 100%);
            }
        }
        .te {
            overflow: hidden;
            @include flexbox();
            .myscore {
                text-align: center;
                line-height: 29px;
            }
        }
        .star {
            @include flexbox();
            @include text-color(#f66);
            @include flexbox();
            li {
                @include rect(20px, auto);
                border: 0;
            }
        }
    }
}
</style>

<script>
import Stars from '@/components/common/Stars'
export default {
  props: ['prolist'],
  components: {
    'my-star': Stars
  },
  methods: {
    goDetail: function (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>
