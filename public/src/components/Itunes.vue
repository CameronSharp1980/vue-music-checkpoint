<template>
    <div class="itunes">
        <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
        <div class="search-box">
            <form @submit.prevent="getMusicByArtist" class="text-center">
                <input type="text" placeholder="Artist name" v-model="searchField">
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>
        <div class="songList col-sm-12 col-md-6 col-lg-6 thumbnail" v-for="(song, i) in searchResults" v-if="song.kind == 'song'">
            <button class="glyphicon glyphicon-plus pull-right" @click="addToMyTunes(song, activePlaylist, myTunes)"></button>
            <img :src="song.artworkUrl100" alt="Album art" class="song-thumb">
            <h2 class="song-title">{{song.trackName}}</h2>
            <h3 class="song-artist">{{song.artistName}}</h3>
            <h5 class="song-collection">Collection: {{song.collectionName}} (${{song.collectionPrice}})</h5>
            <h5 class="song-track">Track # {{song.trackNumber}}</h5>
            <h5 class="song-price">Track Price: ${{song.trackPrice}}</h5>
            <audio controls :src="song.previewUrl" preload="auto" class="audio-preview"></audio>
            <!-- {{song.artistName}} -->
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Itunes',
        data() {
            return {
                searchField: ""

            }
        },
        methods: {
            getMusicByArtist() {
                this.$store.dispatch('getMusicByArtist', this.searchField)
            },
            addToMyTunes(song, activePlaylist, myTunes) {
                // console.log(song)

                this.$store.dispatch('addToMyTunes', { song, activePlaylist, myTunes })
            }
        },
        computed: {
            searchResults() {
                return this.$store.state.results
            },
            activePlaylist() {
                return this.$store.state.activePlaylist
            },
            myTunes() {
                return this.$store.state.myTunes
            }
        }
    }
    // RESEARCH WHETHER THERE IS A BETTER / MORE "VUE-ISH" WAY TO IMPLMENT THIS LATER
    document.addEventListener('play', function (e) {
        var previews = document.getElementsByClassName('audio-preview');
        for (var i = 0; i < previews.length; i++) {
            if (previews[i] != e.target) {
                previews[i].pause();
            }
        }
    }, true);
</script>


<style>
    .itunes {
        background: url("../assets/img/guitars.jpeg");
        background-position: center;
        background-attachment: fixed;
    }

    .search-box {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>