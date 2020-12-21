const Testimony = require('../models/testimony');   





module.exports = {
    //validation: done
    index: async (req, res, next) => {
        const testimonys = await Testimony.find({});
        res.status(200).json(testimonys);
    },
    //validation: done
    newTestimony: async (req, res, next) => {
        const newTestimony = new Testimony(req.value.body);
        const testimony = await newTestimony.save();
        res.status(201).json(testimony);
    },
    //validation: done
    getTestimony: async (req, res, next) => {      
        const { testimonyId } = req.value.params;
        const testimony = await Testimony.findById(testimonyId);
        res.status(200).json(testimony);
    },
    //validation: done
    replaceTestimony: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { testimonyId } = req.value.params;
        const newTestimony = req.value.body;
        const result = await Testimony.findByIdAndUpdate(testimonyId, newTestimony);
        res.status(200).json({ success: true });
    },
    //validation: done
    updateTestimony: async (req, res, next) => {
        // req.body may contain any number of fields
        const { testimonyId } = req.value.params;
        const newTestimony = req.value.body;
        const result = await Testimony.findByIdAndUpdate(testimonyId, newTestimony);
        res.status(200).json({ success: true });
    }
  
};