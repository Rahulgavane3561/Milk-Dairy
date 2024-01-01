// utils/twilioService.js
const accountSid = 'AC2b6a1014595b41d5e2a2d9c10cd3e964';
const authToken = '59c7592652371397c7c5b7f6f6229a87';
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (to, message) => {
    try {
        const sentMessage = await client.messages.create({
            body: message,
            from: '+12055289887', // Your Twilio phone number
            to: to // The number you want to send the SMS to
        });
        console.log('Message sent successfully:', sentMessage.sid);
        return sentMessage;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

module.exports = { sendSMS };
