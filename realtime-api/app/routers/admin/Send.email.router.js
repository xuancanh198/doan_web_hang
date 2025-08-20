const express = require('express');
const { sendEmailCreateAccountSuccess } = require('@/controllers/SendEmailController');
const router = express.Router();

router.post('/create-success-account', sendEmailCreateAccountSuccess);

module.exports = router;
