const Banner = require('../models/banner_slider');   
const multer = require('multer');


module.exports = {
    //validation: done
    index: async (req, res, next) => {
        const banners = await Banner.find({});
        res.status(200).json(banners);
    },
    //validation: done
    newBanner:  async  (req, res, next) => {
        const newBanner = new Banner(req.file.path);
        const banner = await newBanner.save();
        res.status(201).json(banner);
    },
    //validation: done
    getBanner:  async (req, res, next) => {      
        const { bannerId } = req.value.params;
        const banner = await Banner.findById(bannerId);
        res.status(200).json(banner);
    },
    //validation: done
    replaceBanner: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { bannerId } = req.value.params;
        const newBanner = req.value.body;
        const result = await Banner.findByIdAndUpdate(bannerId, newBanner);
        res.status(200).json({ success: true });
    },
    //validation: done
    updateBanner: async (req, res, next) => {
        // req.body may contain any number of fields
        const { bannerId } = req.value.params;
        const newBanner = req.value.body;
        const result = await Banner.findByIdAndUpdate(bannerId, newBanner);
        res.status(200).json({ success: true });
    }
  
};