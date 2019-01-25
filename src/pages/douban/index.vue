<template>
  <div class="counter-warp">
    <p style="text-align: center">{{title}}</p>
    <i-cell-group>
      <i-cell v-for="(item, index) in list" :key="index" :title="item.title">
        <i-avatar :src="item.images.small" size="large" shape="square">A</i-avatar>
      </i-cell>
    </i-cell-group>
    <i-load-more :loading="loading"></i-load-more>
  </div>
</template>

<script>
import dbfly from '@/utils/dRequest';
export default {
  name: 'index',
  data () {
    return {
      currentIndex: 0,
      list: [],
      title: '',
      loading: false
    };
  },
  methods: {
    getFilms () {
      this.loading = true;
      dbfly.get('https://douban.uieee.com/v2/movie/top250')
        .then(res => {
          if (res) {
            let {count, start, subjects, title, total} = res;
            console.log(res);
            console.log(count);
            console.log(start);
            console.log(subjects);
            console.log(title);
            console.log(total);
            this.title = title;
            this.list = subjects;
          }
          this.loading = false;
        }).catch(err => {
          console.log(err);
          this.loading = false;
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
