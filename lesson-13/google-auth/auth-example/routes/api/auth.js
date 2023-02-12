const express = require("express");

const {validateBody, authenticate, passport} = require("../../middlewares")

const {ctrlWrapper} = require("../../helpers")

const {schemas} = require("../../models/user")

const ctrl = require("../../controllers/auth")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))

router.post("/refresh", validateBody(schemas.refreshSchema), ctrlWrapper(ctrl.refresh))

router.get("/google", passport.authenticate("google", {
    scope: ["email, profile"]
}))

router.get("/google/callback", passport.authenticate("google", {session: false}), ctrlWrapper(ctrl.googleAuth))

module.exports = router;