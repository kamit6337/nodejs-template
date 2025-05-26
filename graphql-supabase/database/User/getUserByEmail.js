import supabaseClient from "../../lib/supabaseClient.js";
import {
  getUserByEmailRedis,
  setUserIntoRedis,
} from "../../redis/User/user.js";

const getUserByEmail = async (email) => {
  if (!email) throw new Error("Email is not provided");

  const get = await getUserByEmailRedis(email);

  if (get) {
    return get;
  }

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    throw new Error(`GET USER BY EMAIL error  : ${error}`);
  }

  const user = data[0];

  await setUserIntoRedis(user);

  return user;
};

export default getUserByEmail;
