import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hargunpreet177@gmail.com',
    pass: 'qggz mbck ptif ijzl'
  }
});

var mailOptions = {
  from: 'hargunpreet177@gmail.com',
  to: 'iit2023191@iiita.ac.in',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
