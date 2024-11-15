import catchAsyncError from "../../lib/catchAsyncError.js";
import HandleGlobalError from "../../lib/HandleGlobalError.js";
import verifyUserOtp from "../../lib/verifyUserOtp.js";

const verifyUserOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new HandleGlobalError("Email or OTP is not provided"));
  }

  await verifyUserOtp(email, otp);

  res.json({
    message: "Successfully, verify OTP",
  });
});

export default verifyUserOTP;
