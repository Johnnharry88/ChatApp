// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Ensure this route file exists
const userRoutes = require('./routes/user'); // User-related routes
const messageRoutes = require('./routes/messages');


// Create an Express application
const app = express();
app.use(cors());


// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static('profilePic'));
// Serve static files from the public directory
app.use(express.static('client/build'));

// Use routes defined (protected and not protected)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Add user routes to handle bios and other user-related actions
app.use('/api/chat', messageRoutes);

const xerva = http.createServer(app);

const io = new Server(xerva, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"],
  }
})
// Variable that stores the userid as key with the corresponding socket id as its value
const UserSocketLink = {};

io.on('connection', (socket) => {
  console.log('User connected', socket.id)

  const userID = socket.handshake.query.userID;
  if (userID != 'undefined') UserSocketLink[userID] = socket.id;
  io.emit("fetchOnline", Object.keys(UserSocketLink));

  socket.on('disconnect', () =>  {
    console.log('User disconnected', socket.id)
    delete UserSocketLink[userID];
    io.emit('fetchOnline', Object.keys(UserSocketLink));
  });
});

// Connects to the database
mongoose.connect('mongodb+srv://harryjohnwhye:johnharry88@cluster0.frg2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
       console.log('MongoDB connected');
   })
   .catch(err => {
       console.error('MongoDB connection error:', err);
   });

// Start the server
const PORT = process.env.PORT || 5000;
xerva.listen(PORT, () => console.log(`Server running on port ${PORT}`));
