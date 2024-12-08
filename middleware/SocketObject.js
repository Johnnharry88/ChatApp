const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PATCH"],
  }
})

const UserSocketLink = {};

const getReceiverSocket = (receiverId) => {
  return UserSocketLink[receiverId];
};

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  const userId = socket.handshake.query.userID;

  if (userId !== 'undefined') UserSocketLink[userId] = socket.id;
  io.emit('fetchOnline', Object.keys(UserSocketLink));

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id)
    delete UserSocketLink[userId];
    io.emit('fetchOnline', Object.keys(UserSocketLink));
  });
});


module.exports = { io, getReceiverSocket, app, server };
