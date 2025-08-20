const ejs = require('ejs');
const path = require('path');
const transporter = require('@/configs/Mail.config');
const { i18next } = require('@/configs/i18n');

async function sendAccountCreationEmail(toEmail, username, password, lang = 'vi') {
  const t = i18next.getFixedT(lang); 

  const templatePath = path.join(__dirname, '..', 'views/mail', 'CreateAccountSuccess.ejs');

  const htmlContent = await ejs.renderFile(templatePath, { username, password, t });

  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: toEmail,
    subject: t('email.account_created_subject'),
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendAccountCreationEmail,
};
