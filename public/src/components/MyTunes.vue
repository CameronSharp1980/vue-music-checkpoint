<template>
    <div class="mytunes">
        <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
        <div class="songList col-sm-12 thumbnail" v-for="(playlist, i) in myPlaylists">
            <div class="playlist-title">
                <h2>{{playlist.name}}</h2>
            </div>
            <div class="song-list">
                <div class="song-entry" v-for="(song, i) in myTunes" v-if="song.playlistId == playlist._id">
                    {{song.title}}
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