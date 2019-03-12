<template>
  <div class="film-detail">
    <film-card :imgSrc="images.small"
               :filmType="genres"
               :actors="casts"
               :name="title"></film-card>

    <div class="cast-list">
      <div class="cast-list-scroll">
        <actor name="hello world"/>
      </div>
    </div>

    <div class="rating-info">
      <div class="left-part">
        {{averageRate}}
        {{totalRatingNum}} 参与
      </div>
      <div class="right-part">
        <div class="ratings-on-weight" v-for="(item, index) in rating.details" :key="index">
          <div>
            <span>{{index}}星：</span>
            <span>{{rateWeightArr[item]}}%</span>
          </div>
          <progress :percent="rateWeightArr[item]" max="100" backgroundColor="#fff"></progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dbfly from '@/utils/dRequest';
  import FilmCard from '@/components/film-card';
  import Actor from '@/components/actor';
  export default {
    name: 'index',
    components: {
      FilmCard,
      Actor
    },
    data () {
      return {
        id: '',
        title: '',
        rating: '',
        images: '',
        pubDate: '',
        genres: [],
        casts: []
      };
    },
    onShow () {
      this.id = this.$root.$mp.query.id;
      // console.log(this.$root.$mp.query.id);
      this.getdetail(this.id);
    },
    methods: {
      getdetail (id) {
        dbfly.get(`https://douban.uieee.com/v2/movie/subject/${id}`).then(res => {
          console.log(res);
          if (res) {
            let {title, rating, images,
              pubdate, genres, casts} = res;
            this.title = title;
            this.rating = rating;
            this.images = images;
            this.pubDate = pubdate;
            this.genres = genres;
            this.casts = casts;
            // console.log(rating);
            // console.log(pubdate);
            console.log(res.popular_comments);
          }
        });
      }
    },
    computed: {
      totalRatingNum () {
        if (this.rating && this.rating.details) {
          return Object.values(this.rating.details).reduce((previousValue, currentValue) => {
            return currentValue + previousValue;
          }, 0);
        } else {
          return '';
        }
      },
      rateWeightArr () {
        let result = {};
        if (this.rating && this.rating.details) {
          Object.values(this.rating.details).map(item => {
            result[item] = Math.round((item / this.totalRatingNum) * 100);
          });
        }
        return result;
      },
      averageRate () {
        if (this.rating) {
          return this.rating.average;
        } else {
          return 0;
        }
      }
    }
  };
</script>

<style lang="less">
  .film-detail {
    padding: 20rpx;
  }
  .rating-info {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    height: 300rpx;
    .left-part {
      width: 30%;
      height: inherit;
      background: aqua;
    }
    .right-part {
      width: 70%;
      height: inherit;
      .ratings-on-weight {
        width: 100%;
        /*display: inline-block;*/
        /*justify-content: start;*/
        /*align-items: center;*/
        span {
          font-size: 25rpx;
        }
      }
    }
  }

  .cast-list {
    width: 100%;
    overflow: hidden;
    height: 200rpx;

    .cast-list-scroll {
      width: 1000rpx;
      background: aquamarine;
      height: 230rpx;
      overflow-y: hidden;
      overflow-x: auto;
    }
  }
</style>
