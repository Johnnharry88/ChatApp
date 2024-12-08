// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const http = require('http');
const cors = require("cors");
const { app, server } = require('./middleware/SocketObject');

const authRoutes = require('./routes/auth.js'); // Ensure this route file exists
const userRoutes = require('./routes/user.js'); // User-related routes
const messageRoutes = require('./routes/messages.js');

// Create an Express application
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
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
