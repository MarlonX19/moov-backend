const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  auth: {
    user: "84cc96d07bd290046ebf7a141dff023e",
    pass: "159d18c9c48c394050a685d40dca0863"
  }
});

transport.use('compile', hbs({

  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/resources/mail/')
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html'


 
}))

module.exports = transport;
