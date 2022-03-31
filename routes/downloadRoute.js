const express = require('express');
const router = express.Router();
const download_controller = require('../Controllers/downloadController');


const { check } = require('express-validator');

// GET all Users
router.get('/', download_controller.home);

router.post('/download', download_controller.download);

router.post('/upload', download_controller.upload);

module.exports = router;