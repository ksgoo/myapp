/*jshint esversion:6*/
var mongoose = require('mongoose')

// Schema
var guideSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
        default: " "
    },
    phone: {
        type: String,
        required: false,
        default: ""
    },
});

module.exports = {
    schema: mongoose.model('Guide', guideSchema),
}