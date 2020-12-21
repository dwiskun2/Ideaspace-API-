// const express = require('express');
const router = require('express-promise-router')();

const ProductsController = require('../controllers/products');
const {validateBody, validateParam, schemas} = require('../middlewares/routeHelpers2');

router.route('/')
    .get(ProductsController.index)
    .post(validateBody(schemas.productSchema),
        ProductsController.newProduct);

router.route('/:productId')
    .get(validateParam(schemas.idSchema, 'productId'), ProductsController.getProduct )
    .put([validateParam(schemas.idSchema, 'productId'),
        validateBody(schemas.putProductSchema)],
        ProductsController.replaceProduct)
    .patch([validateParam(schemas.idSchema, 'productId'),
        validateBody(schemas.patchProductSchema)],
        ProductsController.updateProduct)
    .delete(validateParam(schemas.idSchema, 'productId'),
        ProductsController.deleteProduct);


    
module.exports = router;
