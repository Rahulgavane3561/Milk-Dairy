const { sendSMS } = require('./twilio');

const recipientNumber = '+918105356165';
const otpMessage = 'Your OTP code is: 1234'; // Change this to your actual OTP message

try {
  sendSMS(recipientNumber, otpMessage);
  console.log('OTP sent successfully to', recipientNumber);
} catch (error) {
  console.error('Failed to send OTP:', error);
}
