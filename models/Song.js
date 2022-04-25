const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    songName: {
        type: String,        
        required: [true, `Please enter the song's name`] 
    },
    songGenre: {
        type: String,
        required: [true, `Please enter the song's genre`]
    },
    product: {
        // required: [true, "a product is required for review"],
        type: mongoose.Types.ObjectId,
        // type - configures 'product' field to only store MDB - Object Ids
        // when creating a new review - we absolutely need an object 
        ref: 'Singer'
        // reference is how mongoose will know where to look up documents
        // that match the current product's ObjectId
        // ref should store a string that matches the name of your related model
    }
}, {timestamps: true})

// Schema - blueprint - handles validation, interface with the DB 
// handle creating a 'reviews' collection
// meta information - timestamps / updates / data formatting

const Review = mongoose.model("Song", songSchema)

module.exports = Review