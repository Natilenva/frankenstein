import { createTransport } from 'nodemailer';

const { SMTP_HOST, SMTP_PASS, SMPT_PORT, SMPT_USER } = process.env;

const transporter = createTransport({
    host: SMTP_HOST,
    port: SMPT_PORT,
    auth: {
        user: SMPT_USER,
        pass: SMTP_PASS,
    },
});
async function sendEmail(destination, subject, content) {
    try {
        await transporter.sendMail({
            from: '"Frankenstein" <valentinalonsorodriguez@gmail.com>',
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
