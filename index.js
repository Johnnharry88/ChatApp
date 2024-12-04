// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
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
// Serve static files from the public directory
app.use(express.static('client/build'));
// Use routes defined (protected and not protected)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Add user routes to handle bios and other user-related actions
app.use('/api/chat', messageRoutes);
app.use(express.static('profilePic'));

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
//const io = socketIo(server, {
//    cors: {
//      origin: "http://localhost:3000",
//    methods: ["GET", 'POST', 'PATCH']
//    }
//});

// WebSocket connection handling
//io.on('connection', (socket) => {
//    console.log('New client connected');

//    socket.on('sendMessage', (message) => {
//        console.log(`Message: ${message}`);
//        io.emit('receiveMessage', message);
//    });

//    socket.on('disconnect', () => {
//        console.log('Client disconnected');
//    });
//});

// Connect to MongoDB (replace with your connection string)
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
