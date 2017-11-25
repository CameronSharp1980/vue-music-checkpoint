var express = require('express')
var bp = require('body-parser')
var dbConnect = require('./config/mlab/mlab-config')
var cors = require('cors')

//declare routes
var myPlaylistRoutes = require('./server-assets/routes/my-playlist-routes')
var mySongRoutes = require('./server-assets/routes/my-song-routes')

var server = express()
var port = 3000

//"this should look like pretty much anything we have ever done. (servers?)"


//middleware
server.use(cors({}))
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))

server.use(myPlaylistRoutes)
server.use(mySongRoutes)
// server.use(body)



//routes


//getMyTunes (GET)

//addSongToList (POST)

//updateRanking (PUT)

//deleteTrack (DELETE)


server.listen(port, () => {
    console.log("Server listening on port: ", port)
})