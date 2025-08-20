const express = require('express');
const indexAdminRouter = require('@/routers/admin/Index.admin.router');

const router = express.Router();
router.use('/admin', indexAdminRouter);  

module.exports = router;
