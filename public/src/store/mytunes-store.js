import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    myPlaylists: [],
    myTunes: [],
    results: []
  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },
    setMyPlaylists(state, data) {
      state.myPlaylists = data
    },
    setMyTunes(state, data) {
      state.myTunes = data
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      // var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      // var apiUrl = url + encodeURIComponent(url2);
      var apiUrl = encodeURIComponent(url2); //temporary while bcw getter seems to be down!!!
      //assuming that they get the bcw getter working, the line below should have the api url in the get parenths adn the line above should be replaced with the commented line above it!!!
      $.get(url2).then(data => {
        data = JSON.parse(data)
        console.log(data)
        commit('setResults', data.results)
      })
    },
    getPlaylists({ commit, dispatch }) {
      var url = '//localhost:3000/api/playlists'
      $.get(url).then(data => {
        // data = JSON.parse(data)
        console.log(data)
        commit('setMyPlaylists', data)
      })
    },
    getMyTunes({ commit, dispatch }) {
      //this should send a get request to your server to return the list of saved tunes
      var url = '//localhost:3000/api/songs'
      $.get(url)
        .then(data => {
          console.log(data)
          commit('setMyTunes', data)
        })
    },
    addToMyTunes({ commit, dispatch }, track) {
      //this will post to your server adding a new track to your tunes
      console.log("From store: ", track)

    },
    removeTrack({ commit, dispatch }, track) {
      //Removes track from the database with delete
    },
    promoteTrack({ commit, dispatch }, track) {
      //this should increase the position / upvotes and downvotes on the track
    },
    demoteTrack({ commit, dispatch }, track) {
      //this should decrease the position / upvotes and downvotes on the track
    }

  }
})

export default store
