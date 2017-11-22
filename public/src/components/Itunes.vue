<template>
    <div class="itunes">
        <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
        <form @submit.prevent="getMusicByArtist">
            <input type="text" placeholder="Artist name" v-model="searchField">
            <button type="submit">Search</button>
        </form>
        <div class="songList" v-for="(song, i) in searchResults">
            <p>{{song.artistName}}</p>
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
            }
        },
        computed: {
            searchResults() {
                return this.$store.state.results
            }
        }
    }
</script>


<style>
</style>