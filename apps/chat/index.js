const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
//const authRoute = require("./routes/auth");
//const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");
const { MONGODB } = require('./config.js');
//const { ApolloServer, PubSub } = require('apollo-server');
const http = require("http");
const server = http.createServer(app); //Create server with express
var cors = require('cors')
const io = require('socket.io')(server, {
  cors: {
  },  
  // allowRequest: (req, callback) => {
  //   const noOriginHeader = req.headers.origin === undefined;
  //   callback(null, noOriginHeader);
  // }
});

dotenv.config();

const PORT = process.env.PORT || 9000;

mongoConfigs = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify: false}
  };
  
  mongoose.connect(
    MONGODB,
    mongoConfigs,
    () => {
      console.log("Connected to MongoDB");
    }
  );
// mongoose
//     .connect(MONGODB, mongoConfigs)
//     .then(() => {
//       console.log('MongoDB Connected');
//       return server.listen({ port: PORT });
//     })
//     .then((res) => {
//       console.log(`Server running at ${res.url}`);
//     })
//     .catch(err => {
//       console.error(err)
// })

app.use(cors())
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
});

//app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // console.log("a user connected.");
    io.emit("getUsers", users);
  });
  

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log('sender id:', senderId)
    console.log('user:', user)
    //io.to(socket.id).emit("getMessage", {
    try {
      io.to(user.socketId).emit("getMessage", {
        senderId,
          text,
        });
    } catch (err) {
      console.log(text);
    }

  });

  //when disconnect
  socket.on("disconnect", () => {
    // console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


server.listen(PORT, () => {
  console.log("Backend server is running!");
});
