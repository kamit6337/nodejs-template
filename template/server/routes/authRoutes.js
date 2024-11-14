import { environment } from "../utils/environment.js";
import express from "express";
import passport from "passport";
import signup from "../controllers/auth/signup/signup.js";
import loginCheck from "../controllers/auth/login/loginCheck.js";
import login from "../controllers/auth/login/login.js";
import forgotPassword from "../controllers/auth/forgot-password/forgotPassword.js";
import newPassword from "../controllers/auth/forgot-password/newPassword.js";
import OAuthLogin from "../controllers/auth/OAuth-login/OAuthLogin.js";
import verifySignup from "../controllers/auth/signup/verifySignup.js";
import resendOtp from "../controllers/auth/signup/resendOtp.js";
import verifyUserOTP from "../controllers/auth/otp/verifyUserOTP.js";

const router = express.Router();

// NOTE: CONTINUOUS CHECK LOGIN
router.get("/login/check", loginCheck);

// NOTE: FORGOT PASSWORD
router.post("/forgot", forgotPassword);
router.post("/verifyOTP", verifyUserOTP);
router.post("/newPassword", newPassword);

// NOTE: CUSTOM SIGNUP AND LOGIN
router.post("/resendOtp", resendOtp);
router.post("/login", login);
router.post("/signup", signup);
router.post("/signup/verify", verifySignup);

// NOTE: OAUTH SIGNUP AND LOGIN
router.get("/login/OAuth", OAuthLogin);

// NOTE: GOOGLE OAUTH
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/OAuth",
    failureRedirect: environment.CLIENT_URL,
  })
);

export default router;
