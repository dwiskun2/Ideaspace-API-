const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const EventsController = require('../controllers/user_events');

const { validateParam, validateBody, schemas } = require('../middlewares/routeHelpers2');

router.route('/')
    .get(EventsController.index)
    .post(validateBody(schemas.eventSchema),EventsController.newEvent);

router.route('/:eventId')
    .get(validateParam(schemas.idSchema, 'eventId'), EventsController.getEvent)
    .put([validateParam(schemas.idSchema, 'eventId'), 
        validateBody(schemas.eventSchema)],
        EventsController.replaceEvent)
    .patch([validateParam(schemas.idSchema, 'eventId'), 
        validateBody(schemas.eventOptionalSchema)],
        EventsController.updateEvent);

router.route('/:eventId/products')
    .get(validateParam(schemas.idSchema, 'eventId'), EventsController.getEventProducts)
    .post([validateParam(schemas.idSchema, 'eventId'), 
    validateBody(schemas.eventProductSchema)],
    EventsController.newEventProduct);

module.exports = router;