<template>
<span>hello</span>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        id: ''
      };
    },
    onShow () {
      this.id = this.$root.$mp.query.id;
      // console.log(this.$root.$mp.query.id);
    }
  };
</script>

<style scoped>

</style>
