const Event = require('../models/user_event');   
const Product = require('../models/product');




module.exports = {
    //validation: done
    index: async (req, res, next) => {
        const events = await Event.find({});
        res.status(200).json(events);
    },
    //validation: done
    newEvent: async (req, res, next) => {
        const newEvent = new Event(req.value.body);
        const event = await newEvent.save();
        res.status(201).json(event);
    },
    //validation: done
    getEvent: async (req, res, next) => {      
        const { eventId } = req.value.params;
        const event = await Event.findById(eventId);
        res.status(200).json(event);
    },
    //validation: done
    replaceEvent: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { eventId } = req.value.params;
        const newEvent = req.value.body;
        const result = await Event.findByIdAndUpdate(eventId, newEvent);
        res.status(200).json({ success: true });
    },
    //validation: done
    updateEvent: async (req, res, next) => {
        // req.body may contain any number of fields
        const { eventId } = req.value.params;
        const newEvent = req.value.body;
        const result = await Event.findByIdAndUpdate(eventId, newEvent);
        res.status(200).json({ success: true });
    },
    //validation: done
    getEventProducts: async (req, res, next) => {
        const { eventId } = req.value.params;
        const event = await Event.findById(eventId).populate('products');
        res.status(200).json(event.products)
    },

    newEventProduct: async (req, res, next) => {
        const { eventId } = req.value.params;
        // Create new product
        const newProduct = new Product(req.value.body);
        // Get Event
        const event = await Event.findById(eventId);
        // assign event as a product's events
        newProduct.events = event;
        //save the product
        await newProduct.save();
        // Add product to the event's events array 'products'
        event.products.push(newProduct);
        // Save the event
        await event.save();
        res.status(201).json(newProduct)
    }
};