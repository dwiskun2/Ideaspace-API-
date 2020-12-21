const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nama: String,
    email: String,
    password: String,
    biodata: String,
    tanggal_lahir: Date,
    jenis_kelamin: String,
    foto_user: String,
    resetLink: { type: String, default: ''},
    isAdmin: { type: Boolean, default: false},
    active: { type: Boolean, default: true},
    user_bergabung: { type: Date, default: Date.now},
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'transaction'
    }]
});

const User = mongoose.model('user', userSchema);
module.exports = User;