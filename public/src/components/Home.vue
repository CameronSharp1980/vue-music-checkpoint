<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <div class="container-fluid">
      <div class="row">
        <my-tunes class="my-tunes col-sm-12 col-md-6"></my-tunes>
        <itunes class="itunes col-sm-12 col-md-6"></itunes>
      </div>
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
  .home {
    background: url("../assets/img/guitars.jpeg");
    background-position: center;
    background-attachment: fixed;
  }

  .my-tunes {
    /* display: inline-block; */
    min-height: 100vh;
    /* min-width: 50%; */
    /* background: green; */
  }

  .itunes {
    /* display: inline-block; */
    /* background: red; */
    min-height: 100vh;
    /* min-width: 45%; */
  }
</style>