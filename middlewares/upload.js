const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb){
        cb(null, + path.extname(file.originalname)); 
    }
});
 
const upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(
            // file.extname == "image/jpg" ||
            // file.extname == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png"
        ){
            return callback(null,true);
        }else{
            console.log('Only JPG and PNG file supported')
            return callback('Error: Images Extendtion not supported');
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload