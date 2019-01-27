<template>
  <div class="film-detail">
    <film-card :imgSrc="images.small"
               :filmType="genres"
               :actors="casts"
               :name="title"></film-card>
    <i-cell-group>
      <i-cell v-for="(item, index) in rating.details" :key="index">
        <div class="rate-info">
          <i-progress percent="25" :stroke-width="6"></i-progress>
          <i-rate :value="index" :size="6"></i-rate>
        </div>
      </i-cell>
    </i-cell-group>
  </div>
</template>

<script>
  import dbfly from '@/utils/dRequest';
  import FilmCard from '@/components/film-card';
  export default {
    name: 'index',
    components: {
      FilmCard
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
            console.log(rating);
            console.log(pubdate);
            console.log(casts);
          }
        });
      }
    }
  };
</script>

<style lang="less">
  .film-detail {
    padding: 20rpx;
  }
  .rate-info {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    ._i-progress {
      width: 100%;
      flex: 2;
    }
  }
</style>
