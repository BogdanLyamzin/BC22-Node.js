const {User} = require("../../models/user")

const {RequestError, sendMail} = require("../../helpers");

const resendEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw RequestError(404, "Email not found");
    }
    if(user.verify) {
        throw RequestError(400, "Email already verify")
    }

    const mail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Click to verify email</a>`
    };

    await sendMail(mail);

    res.json({
        message: "Email resend"
    })

}

module.exports = resendEmail;