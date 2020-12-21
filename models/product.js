const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    foto_product: String,
    deskripsi_product: String,
    rincian_product: String,
    jumlah_views: Number,
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'event'
    }],
    donations: [{
        type: Schema.Types.ObjectId,
        ref: 'donation'
    }]
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;