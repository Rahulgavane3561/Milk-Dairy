// otpSender.js
const nodemailer = require('nodemailer');

function sendOtpEmail(email, otp, callback) {
    // Create a Nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nexusdairy2023@gmail.com',
            pass: 'umja aepr vcsp lasi'
        }
    });

    // Email options
    const mailOptions = {
        from: 'nexusdairy2023@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Error sending OTP email:', error);
            callback(error);
        } else {
            console.log('OTP email sent successfully.');
            callback(null);
        }
    });
}

module.exports = { sendOtpEmail };
