const createTokens = require("../../helpers/createTokens")

const googleAuth = async(req, res)=> {
    const {accessToken, refreshToken} = await createTokens(req.user._id);

    res.redirect(`http://localhost:3000?accessToken=${accessToken}&refreshToken=${refreshToken}`);
}

module.exports = googleAuth;