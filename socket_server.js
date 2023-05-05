const socketio = require('socket.io');

function initializeSocket(server) {
  // create a new Socket.IO instance and attach it to the server
  const io = socketio(server);

  // listen for connections on the Socket.IO instance
  io.on('connection', (socket) => {
    console.log('A user connected!');

    // send a welcome message to the new user
    socket.emit('message', 'Welcome to the chat!');

    // listen for messages sent by the user
    socket.on('message', (message) => {
      console.log('Received message:', message);

      // broadcast the message to all connected users
      io.emit('message', message);
    });

    // listen for disconnections
    socket.on('disconnect', () => {
      console.log('A user disconnected!');
    });
  });
}

module.exports = initializeSocket;
