// utils/twilioService.js
const accountSid = 'AC2b6a1014595b41d5e2a2d9c10cd3e964';
const authToken = '6ca486d06c7592e912e52ce67167f0bd';
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
