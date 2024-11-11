const mongoose = require('mongoose')
const model = mongoose.model

productSchema = new mongoose.Schema({
    barCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    expireDate: {
        type: Date,
        required: false
    },
    image: {
        type: Buffer
    },
    weight: {
        type: Number,
        required: true
    },
    productStatus: {
        type: String,// O referencia a otro modelo?
        required: true 
    },
    unitMeasure: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }
},
{
    timeseries: true,
    versionKey: false
})

module.exports = model("products", productSchema)