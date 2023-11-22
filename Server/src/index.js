const express  = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000"
    },
})

io.on("connection", (socket) => {

    console.log("connected")

    io.emit("new_user", {type: 'new_user', user_details: socket.id, payload: 'new user has joined'});
    

    socket.on("chat", (data) => {
        console.log(data)
        socket.broadcast.emit("recieve", data);
    })

    socket.on("disconnect", () => {
        console.log("disconnected");
    })
})

server.listen(3001, () => {
    console.log('server is running');
})