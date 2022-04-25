// models/Product.js

const mongoose = require('mongoose');

const singerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty :(']
    },
    gender: {
        type: String,
       required: [true, 'gender cannot be empty!']
    },
    image: {
        type: String,
        required: [true, 'image cannot be empty!']
    }
},
    {
        timestamps: true
    }
);

// mongoose.model(<mongodb collection name>, our schema)
const Product = mongoose.model('Singer', singerSchema);

module.exports = Singer;

// we will access the array data through our 'database'
// without our module.exports we would not be able to access data from this file