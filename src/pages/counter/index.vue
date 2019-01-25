<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count + 2}}</p>
    <p>
      <i-button type="primary" @click="increment">+</i-button>
      <i-button type="error" @click="decrement">-</i-button>
    </p>

    <a href="/pages/index/main" class="home">去往首页</a>
  </div>
</template>

<script>
// Use Vuex
import store from './store';

export default {
  computed: {
    count () {
      return store.state.count;
    }
  },
  methods: {
    increment () {
      store.commit('increment');
    },
    decrement () {
      store.commit('decrement');
    }
  },
  mounted () {
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // wx.openLocation({
        //   latitude,
        //   longitude,
        //   scale: 18
        // })
        console.log(latitude, longitude);
      }
    });
  }
};
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
