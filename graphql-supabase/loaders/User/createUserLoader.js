import DataLoader from "dataloader";
import supabaseClient from "../../lib/supabaseClient.js";

const createUserLoader = () =>
  new DataLoader(async (ids) => {
    const userIds = [...ids];

    const { data: users, error } = await supabaseClient
      .from("users")
      .select("*")
      .in("_id", ids);

    if (error) {
      throw new Error(error);
    }

    const map = new Map(users.map((user) => [user._id?.toString(), user]));

    return userIds.map((userId) => map.get(userId?.toString()));
  });

export default createUserLoader;
