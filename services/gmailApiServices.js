const { google } = require('googleapis');
const { content } = require('googleapis/build/src/apis/content');

async function sendEmail(auth, to, subject, message) {
    const gmail = google.gmail({ version: 'v1', auth });
    const emailContent = [
      `To: ${to}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      message,
    ].join('\n');
  
    const encodedMessage = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
  
    console.log(res.data);
    return res.data;
  }

module.exports = {
    sendEmail: sendEmail
};