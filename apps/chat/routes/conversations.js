const router = require("express").Router();
const Conversation = require("../models/Conversation");
var cors = require('cors')
const { corsOptions } = require('../config');

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", cors(corsOptions), async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", cors(corsOptions), async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


//new conv

router.post("/", cors(corsOptions), async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  console.log(req.body.senderId, req.body.receiverId)
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// with query instead of body
router.post("/postConv/", cors(corsOptions), async (req, res) => {

  const newConversation = new Conversation({
    members: [req.query.senderId, req.query.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;