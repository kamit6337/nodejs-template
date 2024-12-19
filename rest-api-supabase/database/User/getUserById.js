import supabaseClient from "../../lib/supabaseClient.js";
import { getUserByIdRedis, setUserIntoRedis } from "../../redis/User/user.js";

const getUserById = async (id) => {
  const get = await getUserByIdRedis(id);

  if (get) {
    return get;
  }

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("_id", id);

  if (error) {
    throw new Error(error);
  }

  const user = data[0];

  await setUserIntoRedis(user);

  return user;
};

export default getUserById;
