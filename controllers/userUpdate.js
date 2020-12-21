const db = require('../models/user');
const objectId = require('mongodb').ObjectID;
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = {
    userUpdate: async (req, res, next) => {
    const updateData = {
        nama: req.body.nama,
        biodata: req.body.biodata,
        tanggal_Lahir: req.body.tanggal_Lahir,
        jenis_Kelamin: req.body.jenis_Kelamin
        //fix the handel of the user photo soon
        // foto_User: req.body.foto_User

    };
    if(req.file){
        updateData.foto_User = req.file.path
    }
    const id = req.body.id;
    try{
        // const userDate = await db.User.create(req.body);
        const userDate = await db.User.updateOne({"_id": objectId(id)},{$set: updateData}, (err, result) => {
            console.log("Update User Data is Success");
        });

        res.send(userDate);
        // res.json(userDate);
    }catch(err){
        next(err);
    }
    },

    userUpdatePassword: async (req, res, next) => {
    
        //this is for hash the password
        const hashed = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashed;
    
        const updateData = {
            password: req.body.password
    
        };
        
        const id = req.body.id;
        try{
            // const userDate = await db.User.create(req.body);
            const userDate = await db.User.updateOne({"_id": objectId(id)},{$set: updateData}, (err, result) => {
                console.log("Update User Data is Success");
            });
    
            res.send({code: 200, message: "Password success to update"});
            // res.json(userDate);
        }catch(err){
            next(err);
        }
    }
    

}




