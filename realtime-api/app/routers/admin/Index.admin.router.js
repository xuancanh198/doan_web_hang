const express = require('express');
const SendEmailRouter = require('@/routers/admin/Send.email.router');

const router = express.Router();
router.use('/send-email', SendEmailRouter);  

module.exports = router;
