const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    jumlah_nominal_donasi: Number,
    target_nominal_donasi: Number,
    date_donasi: Number,
    created_at: { type: Date, default: Date.now},
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'transaction'
    }]
});

const Donation = mongoose.model('donation', donationSchema);
module.exports = Donation; 