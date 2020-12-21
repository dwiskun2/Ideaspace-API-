// const express = require('express');
const router = require('express-promise-router')();

const TransactionsController = require('../controllers/transactions');
const {validateBody, validateParam, schemas} = require('../middlewares/routeHelpers2');

router.route('/')
    .get(TransactionsController.index)
    .post(validateBody(schemas.transactionSchema),
        TransactionsController.newTransaction);

router.route('/:transactionId')
    .get(validateParam(schemas.idSchema, 'transactionId'),
        TransactionsController.getTransaction)
    .put([validateParam(schemas.idSchema, 'transactionId'),
        validateBody(schemas.putTransactionSchema)],
        TransactionsController.replaceTransaction)
    .patch([validateParam(schemas.idSchema, 'transactionId'),
        validateBody(schemas.patchTransactionSchema)],
        TransactionsController.updateTransaction)
    .delete(validateParam(schemas.idSchema, 'transactionId'),
        TransactionsController.deleteTransaction);


    
module.exports = router;
