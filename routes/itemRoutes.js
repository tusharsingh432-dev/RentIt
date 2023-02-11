const express = require('express');
const itemController = require(`../controller/itemController`);

const router = express.Router();

router.route('/add').post(itemController.addItem);
router.route('/rent').post(itemController.rentItem);
router.route('/removerentee').post(itemController.removeRentee);
router.route('/delete').delete(itemController.deleteItem);

module.exports = router;