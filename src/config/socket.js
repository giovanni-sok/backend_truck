const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // En prod, on pourra restreindre
      methods: ["GET", "POST", "PATCH"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`📡 New client connected: ${socket.id}`);

    // Rejoindre une room spécifique (ex: drivers, clients)
    socket.on('join', (role) => {
      socket.join(role);
      console.log(`👤 User joined room: ${role}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIO };
