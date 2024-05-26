// const app = require('express')();

// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//    cors: {
//     origin: "*",
//     // methods: ["GET", "POST"],
//    } 
// });

// app.get('/', (req, res)=> {
//     res.send("hello")
// })

// io.on("connection", (socket) => {
    
//     console.log("what is socket: ", socket);
//     console.log("socket is active to be connected");
    
//     socket.on("chat", (payload) => {
//         console.log("what is our payload: ", payload);
//         io.emit("chat", payload)
//     })
// });

// // app.listen(5000, () => console.log("server is active...")); dont do this.

// //do this
// // server.listen(process.env.PORT||5000, () => console.log("server is listening..."));
// server.listen(5000, () => console.log("server is listening..."));


import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'

const app = express();
const server = createServer(app);
let users = [];


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

app.get("/", (req, res) => {
    res.send("home")
})

io.on("connection", (socket)=> {
    console.log(io.engine.clientsCount)
    socket.on("join server", ()=> {
        
        users.push(socket.id);

        console.log("new user created")
        console.log(users)
    io.emit("new user", (users));
    })

    socket.on("join room", (roomName, cb) => {
        socket.join(roomName);
        cb(messages[roomName]);
    })

    socket.on("send message", (payload)=> {
        
            socket.to(payload.reciever).emit(payload.content);
            console.log(payload)
        
      
    })

    socket.on('disconnect', () => {
        users = users.filter(userId => userId !== socket.id);
        io.emit("new user", users);
    });
    
});

server.listen(3001, ()=> {
    console.log("server is running");
})