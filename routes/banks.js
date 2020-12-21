const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const BanksController = require('../controllers/banks');

const { validateParam, validateBody, schemas } = require('../middlewares/routeHelpers2');

router.route('/')
    .get(BanksController.index)
    .post(validateBody(schemas.bankSchema),BanksController.newBank);

router.route('/:bankId')
    .get(validateParam(schemas.idSchema, 'bankId'), BanksController.getBank)
    .put([validateParam(schemas.idSchema, 'bankId'), 
        validateBody(schemas.bankSchema)],
        BanksController.replaceBank)
    .patch([validateParam(schemas.idSchema, 'bankId'), 
        validateBody(schemas.bankOptionalSchema)],
        BanksController.updateBank);

router.route('/:bankId/transactions')
    .get(validateParam(schemas.idSchema, 'bankId'), BanksController.getBankTransactions)
    .post([validateParam(schemas.idSchema, 'bankId'), 
    validateBody(schemas.bankTransactionSchema)],
    BanksController.newBankTransaction);

module.exports = router;