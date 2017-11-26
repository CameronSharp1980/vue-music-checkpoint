<template>
    <div class="mytunes">
        <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
        <div class="songList col-sm-12 thumbnail" v-for="(playlist, i) in myPlaylists">
            <div class="playlist-title">
                <h2>{{playlist.name}}</h2>
            </div>
            <div class="song-list">
                <div class="song-entry" v-for="(song, i) in myTunes" v-if="song.playlistId == playlist._id">
                    <button class="glyphicon glyphicon-trash pull-right" @click="removeTrack(song._id, myTunes)"></button>
                    <button class="glyphicon glyphicon-chevron-up pull-right" @click="promoteTrack(song, myTunes)"></button>
                    <button class="glyphicon glyphicon-chevron-down pull-right" @click="demoteTrack(song, myTunes)"></button>
                    <img :src="song.albumArt" alt="Album art" class="song-thumb">
                    <h5 class="song-title">{{song.title}} : {{song.artist}}</h5>
                    <audio controls :src="song.preview" preload="auto" class="audio-preview"></audio>
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
</style>