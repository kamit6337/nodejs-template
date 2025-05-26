const joinRooms = (socket) => {
  socket.on("joinRooms", async () => {
    const userId = socket.userId;

    // const rooms = await getUserRoomsDB(userId);
    const rooms = [];

    if (rooms.length === 0) return;

    rooms.forEach((room) => {
      socket.join(room._id.toString());
    });
  });
};

export default joinRooms;
