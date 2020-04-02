const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Create New Schema
const newSchema = new Schema({
    title: { type: String, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('NewTask', newSchema)