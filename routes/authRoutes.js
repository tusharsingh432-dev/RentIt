const express = require('express');
const authController = require(`../controller/authController`);

const router = express.Router();

router.route('/login').post(authController.login)
router.route('/signup').post(authController.signup)
router.route('/protecttest').get(authController.protect)
module.exports = router;