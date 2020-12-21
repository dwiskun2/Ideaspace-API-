const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const DonationsController = require('../controllers/donations');

const { validateParam, validateBody, schemas } = require('../middlewares/routeHelpers2');


router.route('/')
    .get(DonationsController.index)
    .post(validateBody(schemas.donationSchema),DonationsController.newDonation);

router.route('/:donationId')
    .get(validateParam(schemas.idSchema, 'donationId'), DonationsController.getDonation)
    .put([validateParam(schemas.idSchema, 'donationId'), 
        validateBody(schemas.donationSchema)],
        DonationsController.replaceDonation)
    .patch([validateParam(schemas.idSchema, 'donationId'), 
        validateBody(schemas.donationOptionalSchema)],
        DonationsController.updateDonation);

router.route('/:donationId/products')
    .get(validateParam(schemas.idSchema, 'donationId'), DonationsController.getDonationProducts)
    .post([validateParam(schemas.idSchema, 'donationId'), 
    validateBody(schemas.donationProductSchema)],
    DonationsController.newDonationProduct);

router.route('/:donationId/transactions')
    .get(validateParam(schemas.idSchema, 'donationId'), DonationsController.getDonationTransactions)
    .post([validateParam(schemas.idSchema, 'donationId'), 
    validateBody(schemas.donationTransactionSchema)],
    DonationsController.newDonationTransaction);

module.exports = router;