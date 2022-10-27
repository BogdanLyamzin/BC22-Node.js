const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
    to: "arestovich@ggmail.com",
    from: "bogdan.lyamzin.d@gmail.com",
    subject: "Когда это все кончится???",
    html: "<p>Через 2-3 недели</p>"
};

sgMail.send(mail)
    .then(()=> console.log("Email send success"))
    .catch((error)=> console.log(error.message))