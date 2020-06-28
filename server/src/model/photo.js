const mongoose = require('mongoose')

const photoSchema = mongoose.Schema({

    image: {
        type: Buffer
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    categories: [{
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Category'
    }],

    author: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Admin'
    }
})

const photo = mongoose.model('Photo', photoSchema)

module.exports = photo
