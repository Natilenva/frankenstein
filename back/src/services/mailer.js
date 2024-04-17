// ovma uhok uqiw mtzu
 import nodemailer from 'nodemailer';

 export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "solon.macgyver19@ethereal.email",
    pass: "r7aXTmxaks3AakCvCh",
  },
});

transporter.verify().then(()=>{
    console.log('Mandando email');
});