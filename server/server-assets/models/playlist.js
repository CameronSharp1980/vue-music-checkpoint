var mongoose = require('mongoose')

// WHAT IS AN AUTO
var schema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Playlist', schema);