const express = require('express');
const auth = require('../middleware/auth');
var Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const router = express.Router();
const User = require('../models/User');

// Example protected route to fetch all users registered for the authenticated user
router.get('/all', auth, async (req, res) => {
  try {
    const loggedIn = req.user._id;
    const allusers = await User.find({ _id: {$ne: loggedIn} }).select('-password');
    res.status(200).json(allusers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve chat history between authenticated user and another user
router.get('/message/:id', auth, async (req, res) => {
  try {
    const {id: receiverId} = req.params;
    const senderId = req.user._id
    // Fetch messages where the authenticated user is either the sender or recipient
    const conversation = await Conversation.findOne({
       participants: { $all: [senderId, receiverId] }
    }).populate('messages'); // Populate messages exchanged

    if (!conversation) {
      return res.status(200).json([]);
     }
     // Send the messages back to the client
     const messages =  conversation.messages;
     res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send/:id', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const { id : receiverId} = req.params;
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await new Message({
      senderId, receiverId, message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

//socket.io  coding here

  await newMessage.save();
  await conversation.save();

  res.status(201).json(newMessage);
  } catch (error) {
    //console.log(error.messaage);
    res.status(500).json({ error: "Internal server error" });
   console.log(error);
  }
});


module.exports = router;
