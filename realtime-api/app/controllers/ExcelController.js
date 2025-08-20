const { sendAccountCreationEmail } = require('@/services/SendEmail.service');

async function sendEmailCreateAccountSuccess(req, res) {
  try {
    const { email, username, password } = req.body;
    const lang = 'vi';

    await sendAccountCreationEmail(email, username, password, lang);

    res.status(201).json({ message: 'User created and email sent.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { sendEmailCreateAccountSuccess };
