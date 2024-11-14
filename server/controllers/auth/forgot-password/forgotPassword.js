import catchAsyncError from "../../../lib/catchAsyncError.js";
import HandleGlobalError from "../../../lib/HandleGlobalError.js";
import sendingEmail from "../../../utils/email/email.js";
import getUserByEmail from "../../../database/User/getUserByEmail.js";
import generateOTP from "../../../utils/javaScript/generateOTP.js";
import otpTemplate from "../../../utils/email/otpTemplate.js";
import { setUserOTPIntoRedis } from "../../../redis/Auth/signUp.js";

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new HandleGlobalError("Email is not provided", 404));
  }

  const findUser = await getUserByEmail(email);

  if (!findUser) {
    return next(
      new HandleGlobalError(
        "You are not our customer. Please signup first",
        403
      )
    );
  }

  const otp = generateOTP();
  const html = otpTemplate(otp);
  await sendingEmail(email, "OTP for verification", html);

  await setUserOTPIntoRedis(email, otp);

  res.json({
    message: "OTP is send to email",
  });
});

export default forgotPassword;
