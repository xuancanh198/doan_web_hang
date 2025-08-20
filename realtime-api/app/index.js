require('module-alias/register');
require('dotenv').config();

const express = require('express');
const { i18nMiddleware } = require('@/configs/i18n');
const router = require('@/routers/index.router');
const app = express();

app.use(i18nMiddleware);

app.use(express.json());
app.use('/api', router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy trên port ${PORT}`);
});
