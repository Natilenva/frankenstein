import { createTransport } from 'nodemailer';
import 'dotenv/config';
const { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } = process.env;

const transporter = createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});
async function sendEmail(destination, subject, content) {
    try {
        await transporter.sendMail({
            from: '"frankensteinhack2024@gmail.com>',
            to: destination,
            subject: subject,
            html: content,
        });
        console.log('Email enviado');
    } catch (error) {
        throw new Error(error.message);
    }
}
export { sendEmail };
