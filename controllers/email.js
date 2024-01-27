const nodemailer = require('nodemailer')
const asyncWrapper = require('express-async-handler')

const sendEmail = asyncWrapper(async (data)=> {
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASS,
        },
      });
      
        let info = await transporter.sendMail({
          from: '"Hey 👻" <abc@gmail.com>', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.html , // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })

module.exports = sendEmail