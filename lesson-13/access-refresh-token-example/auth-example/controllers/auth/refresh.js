const jwt = require("jsonwebtoken")

const {User} = require("../../models/user")

const {RequestError} = require("../../helpers")

const createTokens = require("../../helpers/createTokens")

const {REFRESH_TOKEN_SECRET_KEY} = process.env;

const refresh = async(req, res)=> {
    try {
        const {refreshToken: token} = req.body;
        const {id} = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.refreshToken) {
            throw RequestError(401);
        }

        const {accessToken, refreshToken} = await createTokens(id);
    
        res.json({
            accessToken,
            refreshToken,
        })
    }
    catch(error) {
        if(!error.status) {
            error.status = 401;
        }
        throw error;
    }


}

module.exports = refresh;