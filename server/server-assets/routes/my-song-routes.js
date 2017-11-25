var Songs = require('../models/song')
var router = require('express').Router()

router.get('/api/songs', (req, res, next) => {
    // FIRST JOB is to go get the songs from the db
    Songs.find({})
        .then(songs => res.send(songs))
        .catch(err => res.status(400).send(err))
})

router.get('/api/songs/:id', (req, res, next) => {
    Songs.findById(req.params.id)
        .then(songs => res.send(songs))
        .catch(err => res.status(400).send(err))
})

//CREATES NEW SONGS
router.post('/api/songs', (req, res, next) => {
    Songs.create(req.body)
        .then(songs => res.send(songs))
        .catch(err => res.status(400).send(err))
})

router.put('/api/songs/:id', (req, res, next) => {
    Songs.findByIdAndUpdate(req.params.id, req.body)
        .then(song => {
            // song.update() //BUGGAH?
            res.send({ message: 'You\'ve updated your song!' })
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

router.delete('/api/songs/:id', (req, res, next) => {
    Songs.findByIdAndRemove(req.params.id)
        .then((songs) => {
            res.send({ message: 'Successfully removed song at ' + req.params.id })
        })
        .catch(err => res.status(400).send(err))
})


module.exports = router