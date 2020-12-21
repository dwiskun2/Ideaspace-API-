const router = require('express').Router();

const upload = require('../middlewares/upload');


const { userUpdate, userUpdatePassword} = require("../controllers/userUpdate");
router.post('/update', upload.single('foto_User'), userUpdate);
router.post('/password/update', userUpdatePassword);

module.exports = router;