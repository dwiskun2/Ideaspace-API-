const express = require("express");
const router = require('express').Router();
const handle = require('../controllers'); 


const {logout ,profil ,signup ,resend ,login ,signin ,resetPassword ,verifikasi ,activateAccount ,home ,forgotPassword} = require("../controllers/auth");

router.get('/', home)
router.get('/resend/:token', resend)
router.get('/verifikasi/:token', verifikasi)
router.get('/logout', logout);
router.get('/profil', profil)
router.get('/activateaccount/:token', activateAccount)
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/forgot-password', forgotPassword)
router.put('/reset-password/:resetLink', resetPassword)

module.exports = router; 