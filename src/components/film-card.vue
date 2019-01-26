<template>
  <div class="film-card">
    <div class="film-image">
      <img :src="imgSrc"/>
    </div>
    <div class="film-detail">
      <p class="film-name">{{name}}</p>
      <p>豆瓣评分： {{rate}}</p>
      <p>类型：{{types}}</p>
      <p>时长：{{filmDuration}}</p>
      <p>演员：{{actorName}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'film-card',
    props: {
      imgSrc: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      rate: {
        type: String,
        default: ''
      },
      filmType: {
        type: Array,
        default: () => {
          return [];
        }
      },
      actors: {
        type: Array,
        default: () => {
          return [];
        }
      },
      duration: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    computed: {
      types () {
        return this.filmType.join(',');
      },
      filmDuration () {
        return this.duration.join(',');
      },
      actorName () {
        return this.actors.map(item => item.name).join(',');
      }
    }
  };
</script>

<style lang="less">
  .film-card {
    height: 100px;
    width: 100%;
    display: flex;

    .film-image {
      height: inherit;
      width: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .film-detail {
      height: inherit;
      width: 200px;
      flex: 1;
      padding-left: 5%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .film-name {
        margin-bottom: 10px;
      }
      p:not(.film-name) {
        font-size: 12px;
        color: dimgray;
      }
    }
  }
</style>
