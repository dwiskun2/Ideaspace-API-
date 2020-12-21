const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    nominal_transaksi: Number,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    banks: [{
        type: Schema.Types.ObjectId,
        ref: 'banks'
    }],
    donations: [{
        type: Schema.Types.ObjectId,
        ref: 'donation'
    }]
});

const Transaction = mongoose.model('transaction', transactionSchema);
module.exports = Transaction;