<template>
    <div class="mytunes">
        <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
        <div class="songList" v-for="(playlist, i) in myPlaylists">
            <div class="playlist-title glass text-center">
                <h2 class="playlist-title">{{playlist.name}}</h2>
            </div>
            <div class="row">
                <div class="song-list col-sm-10 col-sm-offset-1 song-box glass" v-for="(song, i) in myTunes" v-if="song.playlistId == playlist._id">
                    <div class="song-pic">
                        <button class="glyphicon glyphicon-trash pull-right list-button l-margin-5" @click="removeTrack(song._id, myTunes)"></button>
                        <button class="glyphicon glyphicon-chevron-up pull-right list-button l-margin-5" @click="promoteTrack(song, myTunes)"></button>
                        <button class="glyphicon glyphicon-chevron-down pull-right list-button" @click="demoteTrack(song, myTunes)"></button>
                        <img :src="song.albumArt" alt="Album art" class="song-thumb">
                    </div>
                    <h5 class="song-title">{{song.title}} : {{song.artist}}</h5>
                    <div>
                        <audio controls :src="song.preview" preload="auto" class="audio-preview"></audio>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'MyTunes',
        data() {
            return {

            }
        },
        mounted() {
            this.$store.dispatch('getPlaylists'),
                this.$store.dispatch('getMyTunes')
        },
        methods: {
            removeTrack(songId, myTunes) {
                this.$store.dispatch('removeTrack', { songId, myTunes })
            },
            promoteTrack(song, myTunes) {
                this.$store.dispatch('promoteTrack', { song, myTunes })
            },
            demoteTrack(song, myTunes) {
                this.$store.dispatch('demoteTrack', { song, myTunes })
            }
        },
        computed: {
            myPlaylists() {
                return this.$store.state.myPlaylists
            },
            myTunes() {
                return this.$store.state.myTunes
            }
        }
    }
</script>


<style>
    h2.playlist-title {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>