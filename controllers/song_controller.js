const express = require('express')
// import express to access Router function

const router = express.Router()
// creates an instance of the router 

// MODELS
const db = require('../models')

// ROUTES - http://localhost:4000/reviews

// index route - serve a index.ejs template
router.get('/', async (req,res, next)=>{
    // res.send('hitting review index')
    try {
        const allSongs = await db.Song.find({})
        res.send(allSongs)

    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})
// new - serving a new.ejs template
// locahost:4000/reviews/new
router.get('/new', async (req,res, next)=>{

    try {
        const allSongs = await db.Song.find({})
        // console.log(allProducts)
        const context ={songs: allSongs}
        res.render('reviews/new.ejs', context)

    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

// create - POST route 
router.post('/', async (req,res, next)=>{
    try{
        const newRSongData = req.body
        const newSong = await db.Song.create(newSongData)
        console.log(newSong)
        // res.redirect('/Songs')
        res.redirect(`/singers/${newSong.product}`)
        // return user to product detail page -> 
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})
// show - serve a show.ejs template
router.get('/:songId', async (req,res, next)=>{
    // res.send('hitting review show: '+req.params.reviewId)
    try {
        const foundSong = await db.Song.findById(req.params.songId).populate('singer')
        res.render('reviews/show.ejs', {song: foundSong})
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})
// update - PUT route
router.put('/:songId', async (req,res, next)=>{
    res.send('hitting song update: '+req.params.songId)
})
// edit - GET - serve an edit.ejs
router.get('/:songId/edit', async (req,res, next)=>{
    res.send('hitting song edit: '+req.params.songId)
})
// destroy - delete 
router.delete('/:songId', async (req,res, next)=>{
    // res.send('hitting review delete: '+req.params.reviewId)
    try{
       const deleteSong = await db.Song.findByIdAndDelete(req.params.songId)
       console.log(deleteSong.id, "<<Song |",deleteSong.product,"<<product") 
       res.redirect('/singers/'+deleteSong.product)
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router