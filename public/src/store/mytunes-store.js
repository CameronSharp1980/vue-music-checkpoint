import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//vue-music.herokuapp.com' : '//localhost:3000'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    activePlaylist: '',
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
      state.activePlaylist = state.myPlaylists[0]
    },
    setMyTunes(state, data) {
      // FOR LOOP THAT REORDERS THE ARRAY BY RANKING BEFORE SETTING THE STATE
      // var tempData = []
      // for (let i = 0; i < data.length; i++) {
      //   const tune = data[i];

      // }
      data.sort(function (a, b) {
        if (a.ranking < b.ranking) return -1;
        else if (a.ranking > b.ranking) return 1;
        else return 0;
      })
      console.log("Data: ", data)
      state.myTunes = data
    },
    pushMyTune(state, newSong) {
      state.myTunes.push(newSong)
    }
    // delMyTune(state, songId) {
    //   for (let i = 0; i < state.myTunes.length; i++) {
    //     const myTune = state.myTunes[i];
    //     if (myTune.)
    //   }
    // }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      // var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      // var apiUrl = url + encodeURIComponent(url2);
      var apiUrl = encodeURIComponent(url2); //temporary while bcw getter seems to be down!!!
      //After they get the bcw getter working, the line below should have the api url in the get parenths adn the line above should be replaced with the commented line above it!!!
      $.get(url2)
        .then(data => {
          data = JSON.parse(data)
          console.log(data)
          commit('setResults', data.results)
        })
        .fail(err => { console.log(err) })
    },
    getPlaylists({ commit, dispatch }) {
      var url = `${baseUrl}/api/playlists`
      $.get(url)
        .then(data => {
          // data = JSON.parse(data)
          console.log("Playlist data: ", data)
          commit('setMyPlaylists', data)
        })
        .fail(err => { console.log(err) })
    },
    getMyTunes({ commit, dispatch }) {
      //this should send a get request to your server to return the list of saved tunes
      var url = `${baseUrl}/api/songs`
      $.get(url)
        .then(data => {
          console.log("Song data: ", data)
          commit('setMyTunes', data)
        })
        .fail(err => { console.log(err) })
    },
    addToMyTunes({ commit, dispatch }, payload) {
      //this will post to your server adding a new track to your tunes
      console.log("From store: ", payload)
      var url = `${baseUrl}/api/songs`
      var newSong = {
        title: payload.song.trackName,
        albumArt: payload.song.artworkUrl100,
        artist: payload.song.artistName,
        coll: payload.song.collectionName,
        price: payload.song.trackPrice,
        preview: payload.song.previewUrl,
        kind: payload.song.kind,
        ranking: payload.myTunes.length,
        playlistId: payload.activePlaylist._id
      }
      $.post(url, newSong)
        // .then(commit('pushMyTune', newSong))
        .then(res => {
          console.log("Response after posting song: ", res)
          dispatch('getPlaylists')
            .then(dispatch('getMyTunes'))
        })
        .fail(err => { console.log(err) })

      // ERASE THIS AFTER GETTING THE ABOVE FUNCTION WORKING (ADD TO MY TUNES)
      // this.regUser = function regUser(form, getPosts) {
      //   var newUser = new BuildUser(form)
      //   $.post(baseUrl + '/register', newUser)
      //     .then(getPosts)
      //     .fail(logError)
      // }

    },
    removeTrack({ commit, dispatch }, payload) {
      //Removes track from the database with delete
      var deletedIndex = 0
      for (var i = 0; i < payload.myTunes.length; i++) {
        var myTune = payload.myTunes[i];
        if (myTune._id == payload.songId) {
          deletedIndex = i
          break
        }
      }
      for (var j = deletedIndex + 1; j < payload.myTunes.length; j++) {
        var element = payload.myTunes[j];
        $.ajax({
          method: 'PUT',
          url: `${baseUrl}/api/songs/${element._id}`,
          data: { ranking: j - 1 }
        })
      }
      console.log("Deleted Index: ", deletedIndex)
      console.log("Removing song at ID: ", payload.songId)
      // var url = '//localhost:3000/song/' + songId
      $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/api/songs/${payload.songId}`
      })
        .then(res => {
          // debugger
          console.log("Response after deleting song: ", res)
          dispatch('getPlaylists')
            .then(dispatch('getMyTunes'))
        })
        .fail(err => { console.log(err) })


      // this.removeComment = function removeComment(postId, commentId, getComments){
      //   $.ajax({
      //     method: 'DELETE',
      //     url: baseUrl + `/forum/posts/${postId}/comments/${commentId}`
      //   })
      //     .then(getComments(postId))
      //     .fail(logError)
      //   }

    },
    promoteTrack({ commit, dispatch }, payload) {
      //this should increase the position / upvotes and downvotes on the track
      for (var i = 0; i < payload.myTunes.length; i++) {
        // console.log("test test", payload.myTunes)
        // const tuneElement = payload.myTunes[i];
        if (payload.myTunes[i]._id == payload.song._id) {
          if (i == 0) {
            break
          }
          console.log("Promoting track: ", payload.myTunes[i]._id, payload.myTunes[i].title)
          $.ajax({
            method: 'PUT',
            url: `${baseUrl}/api/songs/${payload.myTunes[i]._id}`,
            data: { ranking: i - 1 }
          })
            .then(res => {
              // debugger
              console.log("Promoting song: ", payload.myTunes[i].title + "to ranking (index) : ", i - 1)
              // dispatch('getPlaylists')
              //   .then(dispatch('getMyTunes'))
            })
            .fail(err => { console.log(err) })
          $.ajax({
            method: 'PUT',
            url: `${baseUrl}/api/songs/${payload.myTunes[i - 1]._id}`,
            data: { ranking: payload.myTunes[i - 1].ranking + 1 }
          })
            .then(res => {
              // debugger
              console.log("Demoting song: ", payload.myTunes[i - 1].title + "to ranking (index) : ", i + 1)
              dispatch('getPlaylists')
                .then(dispatch('getMyTunes'))
            })
            .fail(err => { console.log(err) })
          break
        }
      }
    },
    demoteTrack({ commit, dispatch }, payload) {
      //this should decrease the position / upvotes and downvotes on the track
      for (var i = 0; i < payload.myTunes.length; i++) {
        // const tuneElement = payload.myTunes[i];
        if (payload.myTunes[i]._id == payload.song._id) {
          if (i == payload.myTunes.length - 1) {
            break
          }
          console.log("Demoting track: ", payload.myTunes[i]._id, payload.myTunes[i].title)
          $.ajax({
            method: 'PUT',
            url: `${baseUrl}/api/songs/${payload.myTunes[i]._id}`,
            data: { ranking: i + 1 }
          })
            .then(res => {
              // debugger
              console.log("Demoting song: ", payload.myTunes[i].title + "to ranking (index) : ", i + 1)
              // dispatch('getPlaylists')
              //   .then(dispatch('getMyTunes'))
            })
            .fail(err => { console.log(err) })
          $.ajax({
            method: 'PUT',
            url: `${baseUrl}/api/songs/${payload.myTunes[i + 1]._id}`,
            data: { ranking: payload.myTunes[i + 1].ranking - 1 }
          })
            .then(res => {
              // debugger
              console.log("Promoting song: ", payload.myTunes[i + 1].title + "to ranking (index) : ", i - 1)
              dispatch('getPlaylists')
                .then(dispatch('getMyTunes'))
            })
            .fail(err => { console.log(err) })
          break
        }
      }
    }

  }
})

export default store
