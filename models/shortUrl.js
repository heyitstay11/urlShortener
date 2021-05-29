const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const ShortUrl = new mongoose.Schema({
    label:{
        type: String,
        required: true,
    },
    full:{
        type: String,
        required: true,
    },
    short:{
        type: String,
        required: true,
        default: () => nanoid(6),
    },
    clicks:{
        type: Number,
		required: true,
		default: 0
    },
})

module.exports = mongoose.model('ShortUrl', ShortUrl);