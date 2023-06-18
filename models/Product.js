const mongoose = require('mongoose')
const Product = mongoose.model('Product',{
    description: String,
    price: Number,
    amount: Number,
    available: Boolean,
})
module.exports = Product