const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    banner: String

    
 
});

const Banner = mongoose.model('banner', bannerSchema);
module.exports = Banner;