const bcrypt = require("bcryptjs")

const {User} = require("../../models/user")

const {RequestError} = require("../../helpers")

const createTokens = require("../../helpers/createTokens")

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw RequestError(401, "Wrong email"); // throw RequestError(401, "Wrong email or password");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw RequestError(401, "Wrong password"); // throw RequestError(401, "Wrong email or password");
    }

    const {accessToken, refreshToken} = await createTokens(user._id);

    res.json({
        accessToken,
        refreshToken,
    })
}

module.exports = login;