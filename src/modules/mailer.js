const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  auth: {
    user: "907414ce2e93eb97e3b43eb6d250f7fe",
    pass: "a21ef3aed8adedd167a25611540be821"
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
