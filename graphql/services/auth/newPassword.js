import getUserByEmail from "../../database/User/getUserByEmail.js";
import patchUserProfile from "../../database/User/patchUserProfile.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import bcrypt from "bcryptjs";

const newPassword = catchGraphQLError(async (parent, args, contextValue) => {
  const { email, password } = args;

  if (!email || !password) {
    throw new Error("Email and Password is required");
  }

  const findUser = await getUserByEmail(email);

  if (!findUser) {
    throw new Error("You are not our user. Please signup first");
  }

  const hashPassword = bcrypt.hashSync(password, 12);

  const obj = {
    password: hashPassword,
    updatedAt: Date.now(),
  };

  await patchUserProfile(findUser._id.toString(), obj);

  return "Password has been updated";
});

export default newPassword;
