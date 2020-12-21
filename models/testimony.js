const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonySchema = new Schema({
    nama: String,
    nama_organisasi: String,
    deskripsi_testimoni: String,
    foto_user: String
 
});

const Testimony = mongoose.model('testimony', testimonySchema);
module.exports = Testimony;