const express = require('express');
const {
  sendOtpPhone,
  sendOtpEmail,
  verifyOtpPhone,
  verifyOtpEmail,
} = require('../controllers/otpController');

const router = express.Router();

router.post('/send-otp-phone', sendOtpPhone);
router.post('/send-otp-email', sendOtpEmail);
router.post('/verify-otp-phone', verifyOtpPhone);
router.post('/verify-otp-email', verifyOtpEmail);

module.exports = router;
