const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankSchema = new Schema({
    nama_bank: String,
    no_rekening: Number,
    logo_bank: String,
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'transaction'
    }]
});

const Bank = mongoose.model('bank', bankSchema);
module.exports = Bank;