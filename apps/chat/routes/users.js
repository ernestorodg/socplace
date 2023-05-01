const User = require("../models/User");
const router = require("express").Router();
var cors = require('cors')
const { corsOptions } = require('../config');


//get a user
router.get("/", cors(corsOptions), async (req, res) => {
    const userId = req.query.id;
    const username = req.query.username;
    //console.log(userId)
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;