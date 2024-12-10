import getUserByEmail from "../../database/User/getUserByEmail.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import { setUserOTPIntoRedis } from "../../redis/Auth/signUp.js";
import sendingEmail from "../../utils/email/email.js";
import otpTemplate from "../../utils/email/otpTemplate.js";
import generateOTP from "../../utils/javaScript/generateOTP.js";

const forgotPassword = catchGraphQLError(async (parent, args, contextValue) => {
  const { email } = args;

  if (!email) {
    throw new Error("Email is not provided");
  }

  const findUser = await getUserByEmail(email);

  if (!findUser) {
    throw new Error("You are not our customer. Please signup first");
  }

  const otp = generateOTP();

  const html = otpTemplate(otp);

  await sendingEmail(email, "OTP for verification", html);

  await setUserOTPIntoRedis(email, otp);

  return "OTP send to Email for verification";
});

export default forgotPassword;
