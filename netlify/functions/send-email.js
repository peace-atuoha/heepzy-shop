// netlify/functions/send-email.js
// You need to install mailgun.js: npm install mailgun.js form-data
// And set NETLIFY env vars: MAILGUN_API_KEY, MAILGUN_DOMAIN

/*
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { to, subject, text } = JSON.parse(event.body);
    
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });

    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Heepzy Shop <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: [to],
      subject: subject,
      text: text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: msg })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
*/
exports.handler = async () => {
    return { statusCode: 200, body: JSON.stringify({ success: true, message: "Mock email sent" }) };
};
