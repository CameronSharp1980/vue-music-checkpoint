<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <div class="row">
      <my-tunes class="my-tunes col-sm-12 col-md-6 col-lg-4"></my-tunes>
      <itunes class="itunes col-sm-12 col-md-6 col-lg-8"></itunes>
    </div>
  </div>
</template>

<script>
  import MyTunes from './MyTunes'
  import Itunes from './Itunes'

  export default {
    name: 'home',
    components: {
      MyTunes,
      Itunes
    },
    data() {
      return {

      }
    }
  }
</script>


<style>
  .my-tunes {
    /* display: inline-block; */
    min-height: 500px;
    /* min-width: 50%; */
    background: green;
  }

  .itunes {
    /* display: inline-block; */
    background: red;
    min-height: 500px;
    /* min-width: 45%; */
  }
</style>