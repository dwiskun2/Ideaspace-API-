const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const BannersController = require('../controllers/banners');

const { validateParam, validateBody, validatePath, schemas } = require('../middlewares/routeHelpers2');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.route('/', upload.single('banner'))
    .get(BannersController.index)
    .post( upload.single('banner'), BannersController.newBanner);

router.route('/:bannerId')
    .get(validateParam(schemas.idSchema, 'bannerId'), BannersController.getBanner)
    .put([validateParam(schemas.idSchema, 'bannerId'), 
        validateBody(schemas.bannerSchema)],
        BannersController.replaceBanner)
    .patch([validateParam(schemas.idSchema, 'bannerId'), 
        validateBody(schemas.bannerOptionalSchema)],
        BannersController.updateBanner);

module.exports = router;