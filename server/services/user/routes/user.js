const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/users', UserController.getAll);
router.post('/reset-password', UserController.updatePassword);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/activate/:token', UserController.verifyEmail);

module.exports = router;