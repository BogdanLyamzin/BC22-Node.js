const register = require("./register")
const login = require("./login")
const getCurrent = require("./getCurrent")
const logout = require("./logout")
const refresh = require("./refresh")
const googleAuth = require("./googleAuth")

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    refresh,
    googleAuth,
}