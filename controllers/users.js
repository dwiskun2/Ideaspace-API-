const User = require('../models/user');   
const Transaction = require('../models/transaction');




module.exports = {
    //validation: done
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    //validation: done
    newUser: async (req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },
    //validation: done
    getUser: async (req, res, next) => {      
        const { userId } = req.value.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },
    //validation: done
    replaceUser: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },
    //validation: done
    updateUser: async (req, res, next) => {
        // req.body may contain any number of fields
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },
    //validation: done
    getUserTransactions: async (req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId).populate('transactions');
        res.status(200).json(user.transactions)
    },

    newUserTransaction: async (req, res, next) => {
        const { userId } = req.value.params;
        // Create new transaction
        const newTransaction = new Transaction(req.value.body);
        // Get User
        const user = await User.findById(userId);
        // assign user as a transaction's users
        newTransaction.users = user;
        //save the transaction
        await newTransaction.save();
        // Add transaction to the user's users array 'transactions'
        user.transactions.push(newTransaction);
        // Save the user
        await user.save();
        res.status(201).json(newTransaction)
    }
};