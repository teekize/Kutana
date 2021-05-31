const express =require("express");

const app =express();

const server =require("http").Server(app);

const io=require("socket.io")(server)

const {v4: uuidv4} = require("uuid")

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req,res)=>{
    res.redirect(`/${uuidv4()}`)
})

app.get("/:room", (req,res)=>{
    res.render("room", {roomid:req.params.room})
})


// io.on("connection", client=>{
//     client.on("join-room", (roomid,userid)=>{
//         // console.log(roomid, userid);
//         client.join(roomid);
//         console.log(roomid, userid);
//         // client.to(roomid).broadcast.emit("user-connected", userid)
//         client.to(roomid).broadcast.emit('user-connected', userid);
//     })
// })

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)

      console.log(roomId, userId);
    //   socket.to(roomId).broadcast.emit('user-connected', userId)
      io.to(roomId).emit("user-connected", userId); 
    //   socket.on('disconnect', () => {
    //     socket.to(roomId).broadcast.emit('user-disconnected', userId)
    //   })
    })
  })



server.listen(3000, ()=>{
    console.log(`server imeanza kulisten http://127.0.0.1:3000`)
})