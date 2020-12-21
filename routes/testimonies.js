const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const TestimoniesController = require('../controllers/testimonies');

const { validateParam, validateBody, schemas } = require('../middlewares/routeHelpers2');

router.route('/')
    .get(TestimoniesController.index)
    .post(validateBody(schemas.testimonySchema),TestimoniesController.newTestimony);

router.route('/:testimonyId')
    .get(validateParam(schemas.idSchema, 'testimonyId'), TestimoniesController.getTestimony)
    .put([validateParam(schemas.idSchema, 'testimonyId'), 
        validateBody(schemas.testimonySchema)],
        TestimoniesController.replaceTestimony)
    .patch([validateParam(schemas.idSchema, 'testimonyId'), 
        validateBody(schemas.testimonyOptionalSchema)],
        TestimoniesController.updateTestimony);

module.exports = router;