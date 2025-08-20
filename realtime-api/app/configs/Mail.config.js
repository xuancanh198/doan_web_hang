const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // chuẩn hơn service: 'gmail'
  port: 587,
  secure: false, // dùng TLS (STARTTLS)
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports = transporter;
