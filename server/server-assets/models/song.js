var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

// WHAT IS A SONG
var schema = new mongoose.Schema({
    title: { type: String, required: true },
    albumArt: { type: String },
    artist: { type: String, requires: true },
    coll: { type: String },
    price: { type: Number, required: true },
    preview: { type: String, required: true },
    kind: { type: String, required: true },
    ranking: { type: Number, required: true },
    playlistId: { type: ObjectId, required: true, ref: 'Playlist' }
});

module.exports = mongoose.model('Song', schema);