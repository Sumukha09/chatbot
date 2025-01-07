const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { getNextDayOccurrence, convertTo24Hour, formatDate } = require('./calendar');

module.exports = { getNextDayOccurrence, convertTo24Hour, formatDate };

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname));

/**
 * Configure email transport using Nodemailer with Gmail service.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * Verify email transport configuration.
 */
transporter.verify(function (error, success) {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

/**
 * Sends an email using the configured transporter.
 * 
 * @param {Object} options Email options including recipient, subject, and body
 * @returns {Object} Result of the email sending operation
 */
async function sendEmail(options) {
    try {
        const info = await transporter.sendMail(options);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

/**
 * API endpoint to send appointment confirmation emails.
 */
app.post('/send-appointment-email', async (req, res) => {
    const { doctor, day, time, email, appointmentId } = req.body;

    const appointmentDate = getNextDayOccurrence(day);
    const time24h = convertTo24Hour(time);

    const startDateTime = new Date(`${appointmentDate}T${time24h}:00+05:30`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

    const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Appointment with ${doctor}`)}&dates=${formatDate(startDateTime)}/${formatDate(endDateTime)}&details=${encodeURIComponent(`Medical appointment with ${doctor}`)}`;

    const mailOptions = {
        from: {
            name: 'Medical Referral System',
            address: process.env.EMAIL_USER
        },
        to: email,
        subject: 'Appointment Confirmation',
        html: `
            <h2>Appointment Confirmation</h2>
            
            <p>Your appointment has been confirmed with the following details:</p>
            <ul style="list-style-type: none; padding-left: 0;">
                <li><strong>Doctor:</strong> ${doctor}</li>
                <li><strong>Day:</strong> ${day}</li>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>Appointment ID:</strong> ${appointmentId}</li>
            </ul>
            <p>Please save your appointment ID for future reference.</p>
            <p><a href="${calendarLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #4285f4; color: white !important; text-decoration: none; border-radius: 5px; margin: 15px 0;">Add to Google Calendar</a></p>
            <p>If you need to reschedule or cancel your appointment, please use our chat interface.</p>
            <br>
            <p>Best regards,</p>
            <p>Medical Referral System Team</p>
        `
    };


    try {
        const result = await sendEmail(mailOptions);
        res.json({
            success: true,
            message: 'Appointment confirmation email sent successfully',
            messageId: result.messageId,
            calendarLink: calendarLink
        });
    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', {
            code: error.code,
            response: error.response,
            responseCode: error.responseCode
        });
        res.status(500).json({ success: false, message: 'Failed to send confirmation email', error: error.message });
    }
});

/**
 * API endpoint to send cancellation emails for appointments.
 */
app.post('/send-cancellation-email', async (req, res) => {
    const { doctor, day, time, email, appointmentId } = req.body;

    const mailOptions = {
        from: {
            name: 'Medical Referral System',
            address: process.env.EMAIL_USER
        },
        to: email,
        subject: 'Appointment Cancellation Confirmation',
        html: `
            <h2>  Appointment Cancellation Confirmation</h2>
            <p>Dear Patient,</p>
            <p>The following appointment has been cancelled:</p>
            <ul style="list-style-type: none; padding-left: 0;">
                <li><strong>Doctor:</strong> ${doctor}</li>
                <li><strong>Day:</strong> ${day}</li>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>Appointment ID:</strong> ${appointmentId}</li>
            </ul>
            <p>If you wish to schedule a new appointment, please visit our chat interface.</p>
            <br>
            <p>Best regards,</p>
            <p>Medical Referral System Team</p>
        `
    };

    try {
        const result = await sendEmail(mailOptions);
        console.log('Cancellation email sent successfully:', result);
        res.json({ success: true, message: 'Cancellation confirmation email sent successfully', messageId: result.messageId });
    } catch (error) {
        console.error('Error sending cancellation email:', error);
        console.error('Error details:', {
            code: error.code,
            response: error.response,
            responseCode: error.responseCode
        });
        res.status(500).json({ success: false, message: 'Failed to send cancellation email', error: error.message });
    }
});

/**
 * API endpoint to send update emails for appointment changes.
 */
app.post('/send-update-email', async (req, res) => {
    console.log(req.body); // Log the request body to check the incoming data

    const { doctor, day, time, email, appointmentId, oldDay, oldTime } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a correct email address',
            error: 'Invalid email format'
        });
    }

    // Generate calendar link
    const appointmentDate = getNextDayOccurrence(day);
    const time24h = convertTo24Hour(time);
    const startDateTime = new Date(`${appointmentDate}T${time24h}:00+05:30`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes duration

    const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment with ${doctor}&dates=${formatDate(startDateTime)}/${formatDate(endDateTime)}&details=Appointment ID: ${appointmentId}`;

    const mailOptions = {
        from: {
            name: 'Medical Referral System',
            address: process.env.EMAIL_USER
        },
        to: email,
        subject: 'Appointment Update Confirmation',
        html: `
            <h2>Appointment Update Confirmation</h2>
            
            <p>Your appointment has been successfully updated.</p>
            
            <h3>Previous Appointment Details:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
                <li><strong>Doctor:</strong> ${doctor}</li>
                <li><strong>Day:</strong> ${oldDay}</li>
                <li><strong>Time:</strong> ${oldTime}</li>
            </ul>

            <h3>New Appointment Details:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
                <li><strong>Doctor:</strong> ${doctor}</li>
                <li><strong>Day:</strong> ${day}</li>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>Appointment ID:</strong> ${appointmentId}</li>
            </ul>
            <p>Please save your appointment ID for future reference.</p>
            <p><a href="${calendarLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #4285f4; color: white !important; text-decoration: none; border-radius: 5px; margin: 15px 0;">Add to Google Calendar</a></p>
            <p>If you need to reschedule or cancel your appointment, please use our chat interface.</p>
            <br>
            <p>Best regards,</p>
            <p>Medical Referral System Team</p>
        `
    };

    try {
        const result = await sendEmail(mailOptions);
        res.json({ success: true, message: 'Update confirmation email sent successfully', messageId: result.messageId });
    } catch (error) {
        console.error('Error sending update email:', error);
        console.error('Error details:', {
            code: error.code,
            response: error.response,
            responseCode: error.responseCode
        });
        res.status(500).json({ success: false, message: 'Failed to send update email', error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
