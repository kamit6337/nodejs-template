import supabaseClient from "../../lib/supabaseClient.js";
import { hashUserPassword } from "../../lib/bcrypt.js";
import { setUserIntoRedis } from "../../redis/User/user.js";

const postCreateUser = async (obj) => {
  if (!obj) throw new Error("Obj is not provided");

  const modifyObj = await hashUserPassword(obj);

  const { data, error } = await supabaseClient
    .from("users")
    .insert([modifyObj])
    .select()
    .single();

  if (error) {
    throw new Error(error);
  }

  await setUserIntoRedis(data);

  return data;
};

export default postCreateUser;
