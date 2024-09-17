const { Server } = require('socket.io');
const io = new Server({
  cors: "http://localhost:5173/"
})
let users = 0;
io.on('connection', function (socket) {
  users++;
  console.log("users connected", users);
  socket.on('disconnect', () => {
      users--;
      console.log('users connected', users);
  });

  socket.on('canvasImage', (data) => {
    socket.broadcast.emit('canvasImage', data);
  });
});


io.listen(5000);
