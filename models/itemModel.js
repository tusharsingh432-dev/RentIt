const mongoose = require('mongoose');;

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rentee: {
        type: mongoose.Schema.Types.ObjectId
    },
    rating: {
        type: Array
    }
})

module.exports = mongoose.model('Item', itemSchema);