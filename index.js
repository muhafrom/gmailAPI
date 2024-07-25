const express = require('express');
const bodyParser = require('body-parser');

const authorize = require('../gmailAPI/services/googleApiAuthService.js');
const { sendEmail } = require('../gmailAPI/services/gmailApiServices.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendEmail', async (req, res) => {
    let auth = await authorize();

    const { to, subject, message } = req.body;

    try {
      const result = await sendEmail(auth, to, subject, message);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});