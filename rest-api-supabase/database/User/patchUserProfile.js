import { hashUserPassword } from "../../lib/bcrypt.js";
import supabaseClient from "../../lib/supabaseClient.js";
import { setUserIntoRedis } from "../../redis/User/user.js";

const patchUserProfile = async (userId, obj) => {
  const hashedPassword = hashUserPassword(obj);

  const { data, error } = await supabaseClient
    .from("users")
    .update(hashedPassword)
    .eq("_id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(error);
  }

  await setUserIntoRedis(data);

  return data;
};

export default patchUserProfile;
