const twilio = require('twilio');
const transporter = require('../config/nodemailer');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
let otpStorage = {}; 


exports.sendOtpPhone = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    otpStorage[phone] = otp;
    res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};


exports.sendOtpEmail = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`,
    });

    otpStorage[email] = otp;
    res.status(200).json({ message: 'OTP sent to email successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP to email.' });
  }
};


exports.verifyOtpPhone = (req, res) => {
  const { phone, otp } = req.body;

  if (otpStorage[phone] && otpStorage[phone] === otp) {
    delete otpStorage[phone];
    res.status(200).json({ message: 'Phone number verified successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid OTP.' });
  }
};


exports.verifyOtpEmail = (req, res) => {
  const { email, otp } = req.body;

  if (otpStorage[email] && otpStorage[email] === otp) {
    delete otpStorage[email];
    res.status(200).json({ message: 'Email verified successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid OTP.' });
  }
};
