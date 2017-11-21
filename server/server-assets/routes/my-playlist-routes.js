var Playlists = require('../models/playlist')
var router = require('express').Router()

router.get('/api/playlists', (req, res, next) => {
    // FIRST JOB is to go get the playlists from the db
    Playlists.find({})
        .then(playlists => res.send(playlists))
        .catch(err => res.status(400).send(err))
})

router.get('/api/playlists/:id', (req, res, next) => {
    Playlists.findById(req.params.id)
        .then(playlists => res.send(playlists))
        .catch(err => res.status(400).send(err))
})

//CREATES NEW PLAYLIST
router.post('/api/playlists', (req, res, next) => {
    Playlists.create(req.body)
        .then(playlists => res.send(playlists))
        .catch(err => res.status(400).send(err))
})

router.delete('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.id)
        .then((playlists) => {
            res.send({ message: 'Successfully removed playlist at ' + req.params.id })
        })
        .catch(err => res.status(400).send(err))
})


module.exports = router