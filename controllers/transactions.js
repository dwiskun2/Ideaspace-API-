const Transaction = require('../models/transaction');
const User = require('../models/user');
const Bank = require('../models/bank');
const Donation = require('../models/donation');

module.exports = {
   index: async (req, res, next) => {
       //Get All transactions
    const transactions = await Transaction.find({});
    res.status(200).json(transactions);
   },
   
   newTransaction: async (req, res, next) => {
    //1.find the actual users & banks & donations
    const users = await User.findById(req.value.body.users);
    const banks = await Bank.findById(req.value.body.banks);
    const donations = await Donation.findById(req.value.body.donations);
    //2.Create a new transaction
    const newTransaction = req.value.body
    //coba2 disini, kalo ga bisa delete, pisah banks nya
    delete newTransaction.users; 
    delete newTransaction.banks;
    delete newTransaction.donations;

    const transaction = new Transaction(newTransaction);
    //coba2 disini, kalo ga bisa delete, pisah banks nya
    transaction.users = users;
    transaction.banks = banks;
    transaction.donations = donations;
    await transaction.save();

    // 3. Add newly created transaction to the actual users
    //coba2 disini, kalo ga bisa delete, pisah banks nya, coba tambah tanda kurung
    users.transactions.push(transaction);
    banks.transactions.push(transaction);
    donations.transactions.push(transaction);
    await users.save();
    await banks.save();
    await donations.save();

    res.status(200).json(transaction);
   },

   getTransaction: async (req, res, next) => {
       const transaction = await Transaction.findOne({_id: req.value.params.transactionId})
       .populate('users')
       .exec();
       res.status(200).json(transaction);
   },

   replaceTransaction: async (req, res, next) => {
       const { transactionId } = req.value.params;
       const newTransaction = req.value.body;
       const result = await Transaction.findByIdAndUpdate(transactionId, newTransaction);
       res.status(200).json({ success: true});
   },

   updateTransaction: async (req, res, next) => {
    const { transactionId } = req.value.params;
    const newTransaction = req.value.body;
    const result = await Transaction.findByIdAndUpdate(transactionId, newTransaction);
    res.status(200).json({ success: true});
   },

   deleteTransaction: async (req, res, next) => {
    const { transactionId } = req.value.params;
    //Get a transaction
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
       return res.status(404).json({ error: 'Transaction doesn\'t exist'});
    }

    const usersId = transaction.users;
    const banksId = transaction.banks;
    const donationsId = transaction.donations;
    //Get a users banks danations
    const users = await User.findById(usersId);
    const banks = await Bank.findById(banksId);
    const donations = await Donation.findById(donationsId);
    
    

    // Remove the transaction
    await transaction.remove();
    // Remove transaction from the users's users list transactions dari transaction model schema
    //Coba2 disini
    users.transactions.pull(transaction);
    banks.transactions.pull(transaction);
    donations.transactions.pull(transaction);
    await users.save();
    await banks.save();
    await donations.save();

    res.status(200).json({ success: true });
   }
}