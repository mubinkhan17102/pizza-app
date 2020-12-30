const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        required: true,
        type:String
    },
    image: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    },
    size: {
        type: String,
        required:true
    }
})

const menuModel = mongoose.model('menu', menuSchema);
module.exports = menuModel;