<template>
    <div class="itunes">
        <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
        <div class="search-box">
            <form @submit.prevent="getMusicByArtist" class="text-center glass">
                <input type="text" placeholder="Artist name" v-model="searchField" class="search-field">
                <button type="submit" class="btn btn-primary glyphicon glyphicon-search search-button"></button>
            </form>
        </div>
        <div class="row">
            <div class="songList col-sm-10 col-sm-offset-1 song-box glass" v-for="(song, i) in searchResults" v-if="song.kind == 'song'">
                <button class="glyphicon glyphicon-plus pull-right" @click="addToMyTunes(song, activePlaylist, myTunes)"></button>
                <img :src="song.artworkUrl100" alt="Album art" class="song-thumb">
                <div>
                    <h1 class="song-title">{{song.trackName}}</h1>
                    <!-- <h3 class="song-artist"></h3> -->
                    <h3 class="song-collection">{{song.artistName}} - {{song.collectionName}} - Track # {{song.trackNumber}}</h3>
                    <!-- <h5 class="song-track"></h5> -->
                    <!-- <h5 class="song-price">Track Price: ${{song.trackPrice}}</h5> -->
                </div>
                <div class="text-center">
                    <audio controls :src="song.previewUrl" preload="auto" class="audio-preview"></audio>
                </div>
                <!-- {{song.artistName}} -->
            </div>
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
    .search-box {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .search-field {
        display: inline-block;
        background: none;
        border: none;
        border-bottom: 1px solid rgba(200, 200, 200, .75);
    }

    .search-button {
        width: 50px;
    }

    .glass {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .5);
        color: rgba(200, 200, 200, .75);
    }

    input[type="text"].search-field {
        color: #ffffff;
    }

    input[type="text"].search-field:focus {
        color: #ffffff;
        outline: none;
    }

    ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #ffffff;
    }

    ::-moz-placeholder {
        /* Firefox 19+ */
        color: #ffffff;
    }

    :-ms-input-placeholder {
        /* IE 10+ */
        color: #ffffff;
    }

    :-moz-placeholder {
        /* Firefox 18- */
        color: #ffffff;
    }

    .song-box {
        margin-bottom: 25px;
    }

    /* .song-thumb{
    margin: 15px 15px 60px 15px;
} */

    .audio-preview {
        width: 75%;
    }
</style>