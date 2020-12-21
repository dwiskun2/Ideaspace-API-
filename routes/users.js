const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const UsersController = require('../controllers/users');

const { validateParam, validateBody, schemas } = require('../middlewares/routeHelpers2');

router.route('/')
    .get(UsersController.index)
    .post(validateBody(schemas.userSchema),UsersController.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'), 
        validateBody(schemas.userSchema)],
        UsersController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'userId'), 
        validateBody(schemas.userOptionalSchema)],
        UsersController.updateUser);

router.route('/:userId/transactions')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUserTransactions)
    .post([validateParam(schemas.idSchema, 'userId'), 
    validateBody(schemas.userTransactionSchema)],
    UsersController.newUserTransaction);

module.exports = router;