const updateNotificationDB = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("Ids is not provided");
  }

  // const update = await Notification.updateMany(
  //   {
  //     _id: { $in: ids },
  //   },
  //   { $set: { isRead: true } }
  // );
  return null;
};

export default updateNotificationDB;
