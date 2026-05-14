const { sendContactEmail } = require('../services/mail.service');

const sendMessage = async (req, res, next) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await sendContactEmail({ name, email, company, message });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendMessage };