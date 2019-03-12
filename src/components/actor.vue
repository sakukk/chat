<template>
  <div class="actor">
    <div class="actor-image">
      <img :src="imgSrc" width="100%" height="100%"/>
    </div>
    <div class="actor-name">{{name}}</div>
  </div>
</template>

<script>
  export default {
    name: 'actor',
    props: {
      imgSrc: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="less">
  .actor {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100rpx;
    height: 200rpx;
    .actor-image {
      width: inherit;
      height: 170rpx;
    }
    .actor-name {
      width: inherit;
      height: 30rpx;
    }
  }
</style>
