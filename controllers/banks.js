const Bank = require('../models/bank');   
const Transaction = require('../models/transaction');




module.exports = {
    //validation: done
    index: async (req, res, next) => {
        const banks = await Bank.find({});
        res.status(200).json(banks);
    },
    //validation: done
    newBank: async (req, res, next) => {
        const newBank = new Bank(req.value.body);
        const bank = await newBank.save();
        res.status(201).json(bank);
    },
    //validation: done
    getBank: async (req, res, next) => {      
        const { bankId } = req.value.params;
        const bank = await Bank.findById(bankId);
        res.status(200).json(bank);
    },
    //validation: done
    replaceBank: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { bankId } = req.value.params;
        const newBank = req.value.body;
        const result = await Bank.findByIdAndUpdate(bankId, newBank);
        res.status(200).json({ success: true });
    },
    //validation: done
    updateBank: async (req, res, next) => {
        // req.body may contain any number of fields
        const { bankId } = req.value.params;
        const newBank = req.value.body;
        const result = await Bank.findByIdAndUpdate(bankId, newBank);
        res.status(200).json({ success: true });
    },
    //validation: done
    getBankTransactions: async (req, res, next) => {
        const { bankId } = req.value.params;
        const bank = await Bank.findById(bankId).populate('transactions');
        res.status(200).json(bank.transactions)
    },

    newBankTransaction: async (req, res, next) => {
        const { bankId } = req.value.params;
        // Create new transaction
        const newTransaction = new Transaction(req.value.body);
        // Get Bank
        const bank = await Bank.findById(bankId);
        // assign bank as a transaction's banks
        newTransaction.banks = bank;
        //save the transaction
        await newTransaction.save();
        // Add transaction to the bank's banks array 'transactions'
        bank.transactions.push(newTransaction);
        // Save the bank
        await bank.save();
        res.status(201).json(newTransaction)
    }
};