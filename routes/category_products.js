const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const CategoriesController = require('../controllers/category_products');

const { validateParam, validateBody, schemas } = require('../middlewares/routeHelpers2');

router.route('/')
    .get(CategoriesController.index)
    .post(validateBody(schemas.categorySchema),CategoriesController.newCategory);

router.route('/:categoryId')
    .get(validateParam(schemas.idSchema, 'categoryId'), CategoriesController.getCategory)
    .put([validateParam(schemas.idSchema, 'categoryId'), 
        validateBody(schemas.categorySchema)],
        CategoriesController.replaceCategory)
    .patch([validateParam(schemas.idSchema, 'categoryId'), 
        validateBody(schemas.categoryOptionalSchema)],
        CategoriesController.updateCategory);

router.route('/:categoryId/products')
    .get(validateParam(schemas.idSchema, 'categoryId'), CategoriesController.getCategoryProducts)
    .post([validateParam(schemas.idSchema, 'categoryId'), 
    validateBody(schemas.categoryProductSchema)],
    CategoriesController.newCategoryProduct);

module.exports = router;