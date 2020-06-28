const mongoose = require('mongoose')


const categorySchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    }
})

const category = mongoose.model('Category', categorySchema)

module.exports = category
