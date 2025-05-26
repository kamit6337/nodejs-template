import supabaseClient from "../../lib/supabaseClient.js";
import { hashUserPassword } from "../../lib/bcrypt.js";
import { setUserIntoRedis } from "../../redis/User/user.js";

const patchUserProfile = async (userId, obj) => {
  if (!userId || !obj) throw new Error("UserId or Obj is not provided");

  const modifyObj = await hashUserPassword(obj);

  const { data, error } = await supabaseClient
    .from("users")
    .update(modifyObj)
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
