const passport = require("passport");
const {Strategy} = require("passport-google-oauth2");
const {nanoid} = require("nanoid")
const bcrypt = require("bcryptjs")

const {User} = require("../models/user")

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL} = process.env;

const googleParams = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
};

const googleCallback = async(req, accessToken, refreshToken, profile, done) => {
    try {
        const {email, displayName} = profile;
        const user = await User.findOne({email});
        if(user) {
            return done(null, user)
        }
        const hashPassword = await bcrypt.hash(nanoid(), 10);
        const newUser = await User.create({email, name: displayName, hashPassword});
        done(null, newUser);
    }
    catch(error) {
        done(error, false)
    }
}

const googleStrategy = new Strategy(googleParams, googleCallback)

passport.use("google", googleStrategy);

module.exports = passport;

