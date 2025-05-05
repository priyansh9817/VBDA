import nodemailer from 'nodemailer';
import { generateInvitation } from '../utils/openaiHelper.js';
import Guest from '../models/Guest.js';

export const generateAndSendInvitation = async (req, res) => {
  const { guestId, eventName } = req.body;

  try {
    const guest = await Guest.findById(guestId);
    const message = await generateInvitation(guest, eventName);

    // Setup nodemailer (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // your Gmail
        pass: process.env.MAIL_PASS, // App Password from Google
      },
    });

    const mailOptions = {
      from: `"VBDA 2025" <${process.env.MAIL_USER}>`,
      to: guest.email,
      subject: `Invitation to ${eventName}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    guest.invited = true;
    await guest.save();

    res.status(200).json({ message: 'Email sent and invitation marked as sent.' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ message: 'Failed to send invitation email.' });
  }
};
