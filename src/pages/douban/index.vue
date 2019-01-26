<template>
  <div class="counter-warp">
    <p style="text-align: center">{{title}}</p>
    <i-cell-group>
      <i-cell v-for="(item, index) in list" :key="index" is-link>
        <!--<i-avatar :src="item.images.small" size="large" shape="square">A</i-avatar>-->
        <film-card :imgSrc="item.images.small"
                   :rate="item.rating.average"
                   :filmType="item.genres"
                   :duration="item.durations"
                   :actors="item.casts"
                   :name="item.title"></film-card>
      </i-cell>
    </i-cell-group>
    <i-load-more :loading="loading" :tip="tip" v-on:click="getFilms"></i-load-more>
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
      start: 0,
      pageSize: 10,
      list: [],
      title: '',
      loading: false,
      tip: '',
      total: ''
    };
  },
  methods: {
    getFilms () {
      this.loading = true;
      this.tip = '';
      dbfly.get(`https://douban.uieee.com/v2/movie/in_theaters?start=${this.start}&count=${this.pageSize}`)
        .then(res => {
          if (res) {
            let {count, start, subjects, title, total} = res;
            console.log(res);
            this.start = start + count;
            this.title = title;
            this.list = this.list.concat(subjects);
            this.total = total;
            this.tip = start >= total ? '暂无更多' : '加载更多';
          }
          this.loading = false;
        }).catch(err => {
          console.log(err);
          this.loading = false;
          this.tip = '加载更多';
        });
    }
  },
  onShow () {
    this.getFilms();
  }
};
</script>

<style scoped>

</style>
