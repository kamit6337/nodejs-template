import getUserByEmail from "../../../database/User/getUserByEmail.js";
import patchUserProfile from "../../../database/User/patchUserProfile.js";
import HandleGlobalError from "../../../lib/HandleGlobalError.js";
import catchAsyncError from "../../../lib/catchAsyncError.js";
import bcrypt from "bcryptjs";

const newPassword = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleGlobalError("All fields is required", 404));
  }

  const findUser = await getUserByEmail(email);

  if (!findUser) {
    return next(
      new HandleGlobalError("You are not our user. Please signup first")
    );
  }

  const hashPassword = bcrypt.hashSync(password, 12);

  const obj = {
    password: hashPassword,
    updatedAt: Date.now(),
  };

  await patchUserProfile(findUser.id.toString(), obj);

  res.json({
    message: "Password has been updated",
  });
});

export default newPassword;
