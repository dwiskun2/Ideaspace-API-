const Donation = require('../models/donation');   
const Product = require('../models/product');
const Transaction = require('../models/transaction');
const User = require('../models/user');




module.exports = {
    //validation: done
    index: async (req, res, next) => {
        const donations = await Donation.find({});
        res.status(200).json(donations);
    },
    //validation: done
    newDonation: async (req, res, next) => {
        const newDonation = new Donation(req.value.body);
        const donation = await newDonation.save();
        res.status(201).json(donation);
    },
    //validation: done
    getDonation: async (req, res, next) => {      
        const { donationId } = req.value.params;
        const donation = await Donation.findOne({ _id: req.value.params.donationId })
        .populate('transactions')
        .exec()
        res.status(200).json(donation);
    },
    //validation: done
    replaceDonation: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { donationId } = req.value.params;
        const newDonation = req.value.body;
        const result = await Donation.findByIdAndUpdate(donationId, newDonation);
        res.status(200).json({ success: true });
    },
    //validation: done
    updateDonation: async (req, res, next) => {
        // req.body may contain any number of fields
        const { donationId } = req.value.params;
        const newDonation = req.value.body;
        const result = await Donation.findByIdAndUpdate(donationId, newDonation);
        res.status(200).json({ success: true });
    },
    //validation: done
    getDonationProducts: async (req, res, next) => {
        const { donationId } = req.value.params;
        const donation = await Donation.findOne({ _id: req.value.params.donationId })
        .populate('products')
        .populate('donations')
        .populate('transactions')
        .exec();
        res.status(200).json(donation.products)
    },

    newDonationProduct: async (req, res, next) => {
        const { donationId } = req.value.params;
        // Create new product
        const newProduct = new Product(req.value.body);
        // Get Donation
        const donation = await Donation.findById(donationId);
        // assign donation as a product's donations
        newProduct.donations = donation;
        //save the product
        await newProduct.save();
        // Add product to the donation's donations array 'products'
        donation.products.push(newProduct);
        // Save the donation
        await donation.save();
        res.status(201).json(newProduct)
    },

    //validation: done
    getDonationTransactions: async (req, res, next) => {
        const { donationId } = req.value.params;
        const donation = await Donation.findOne({_id: req.value.params.donationId})
        .populate('transactions')
        .exec();
        res.status(200).json(donation.transactions)
    },

    newDonationTransaction: async (req, res, next) => {
        const { donationId } = req.value.params;
        // Create new product
        const newTransaction = new Transaction(req.value.body);
        // Get Donation
        const donation = await Donation.findById(donationId);
        // assign donation as a product's donations
        newTransaction.donations = donation;
        //save the product
        await newTransaction.save();
        // Add product to the donation's donations array 'products'
        donation.transactions.push(newTransaction);
        // Save the donation
        await donation.save();
        res.status(201).json(newTransaction)
    }
};