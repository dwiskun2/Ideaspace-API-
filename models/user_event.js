const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    nama_organisasi: String,
    logo_organisasi: String,
    user_bergabung: { type: Date, default: Date.now},
    alamat_organisasi: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;