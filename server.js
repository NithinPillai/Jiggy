// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);

// Enable CORS for Socket.IO
const io = require('socket.io')(http, {
  cors: {
    origin: "*", // In development, "*" allows all origins; in production, specify the allowed origin(s)
    methods: ["GET", "POST"]
  }
});

// Serve static files from the 'public' folder.
app.use(express.static('public'));

let hostSocket = null;
let clientSocket = null;

io.on('connection', socket => {
  console.log('User connected: ', socket.id);

  // The connecting socket sends its role.
  socket.on('role', role => {
    console.log(`Socket ${socket.id} identified as ${role}`);
    if (role === 'host') {
      hostSocket = socket;
    } else if (role === 'client') {
      clientSocket = socket;
    }
  });

  // Relay the offer from the client to the host.
  socket.on('offer', offer => {
    console.log('Offer received from client');
    if (hostSocket && socket.id === clientSocket.id) {
      hostSocket.emit('offer', offer);
    }
  });

  // Relay the answer from the host to the client.
  socket.on('answer', answer => {
    console.log('Answer received from host');
    if (clientSocket && socket.id === hostSocket.id) {
      clientSocket.emit('answer', answer);
    }
  });

  // Relay ICE candidates between peers.
  socket.on('candidate', candidate => {
    console.log('Candidate received from ', socket.id);
    if (socket.id === clientSocket?.id && hostSocket) {
      hostSocket.emit('candidate', candidate);
    } else if (socket.id === hostSocket?.id && clientSocket) {
      clientSocket.emit('candidate', candidate);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
    if (socket.id === hostSocket?.id) hostSocket = null;
    if (socket.id === clientSocket?.id) clientSocket = null;
  });
});

http.listen(3000, () => {
  console.log('Server running on port 3000');
});
