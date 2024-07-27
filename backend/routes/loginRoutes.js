const express = require('express');
const speakeasy = require('speakeasy');
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to generate OTP
function generateOTP() {
    const secret = process.env.OTP_SECRET;
    return speakeasy.totp({
        secret: secret,
        encoding: 'base32',
    });
}

// Function to send OTP via SMS
const sendOtpToUserSMS = (userPhoneNumber, otp) => {
    client.messages.create({
        body: `Your OTP code is ${otp}`,
        to: userPhoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER
    }).then((message) => console.log(message.sid))
      .catch((error) => console.error('Error sending OTP:', error));
};

// Function to send OTP via Email
const sendOtpToUserEmail = (userEmail, otp) => {
    const msg = {
        to: userEmail,
        from: 'your-email@example.com',
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
        html: `<strong>Your OTP code is ${otp}</strong>`,
    };

    sgMail.send(msg)
        .then(() => console.log('OTP sent successfully'))
        .catch((error) => console.error('Error sending OTP:', error));
};

// Function to verify OTP
function verifyOTP(userOtp) {
    const secret = process.env.OTP_SECRET;
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: userOtp,
        window: 1
    });
}

// Route to handle login and OTP generation
app.post('/login', (req, res) => {
    const { userId, contact, contactType } = req.body; // Assuming you get the user ID and contact info from the request body

    const otp = generateOTP();

    if (contactType === 'sms') {
        sendOtpToUserSMS(contact, otp);
    } else if (contactType === 'email') {
        sendOtpToUserEmail(contact, otp);
    }

    res.status(200).send('OTP sent successfully');
});

// Route to handle OTP verification
app.post('/verify-otp', (req, res) => {
    const { userOtp } = req.body; // Assuming you get the user OTP from the request body

    if (verifyOTP(userOtp)) {
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
