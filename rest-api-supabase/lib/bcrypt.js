import bcrypt from "bcryptjs";

export const hashUserPassword = (obj) => {
  if (obj.password) {
    obj.password = bcrypt.hashSync(obj.password, 12);
  }

  return obj;
};

export const verifyUserPassword = (actualPassword, givenPassword) => {
  const checkPassword = bcrypt.compareSync(
    String(givenPassword),
    actualPassword
  );

  return checkPassword;
};
