import DataLoader from "dataloader";
import User from "../../models/UserModel.js";

const createUserLoader = () =>
  new DataLoader(async (ids) => {
    const userIds = [...ids];

    const users = await User.find({
      _id: { $in: userIds },
    }).lean();

    const map = new Map(users.map((user) => [user._id?.toString(), user]));

    return userIds.map((userId) => map.get(userId?.toString()));
  });

export default createUserLoader;
