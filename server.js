const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1/rocket");

// MATCHMAKING
let queue = [];

function findMatch(player){
  for(let i=0;i<queue.length;i++){
    if(Math.abs(queue[i].rank - player.rank) < 100){
      return queue.splice(i,1)[0];
    }
  }
  queue.push(player);
  return null;
}

// SOCKET
io.on("connection", socket => {

  socket.on("queue", player => {
    const opponent = findMatch(player);

    if(opponent){
      const room = socket.id + opponent.id;

      socket.join(room);
      io.to(opponent.id).socketsJoin(room);

      io.to(room).emit("matchFound");
    }
  });

});

// AUTH
app.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  const user = new User({...req.body, password: hash});
  await user.save();
  res.send("ok");
});

app.post("/login", async (req,res)=>{
  const user = await User.findOne({username:req.body.username});
  if(!user) return res.send("no user");

  const valid = await bcrypt.compare(req.body.password,user.password);
  if(!valid) return res.send("wrong");

  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || "secret");
  res.json({token});
});

http.listen(3000, ()=>console.log("Server running"));
