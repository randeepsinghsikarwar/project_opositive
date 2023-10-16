const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
   cors: {
    origin: "*",
    // methods: ["GET", "POST"],
   } 
});

app.get('/', (req, res)=> {
    res.send("hello")
})

io.on("connection", (socket) => {
    console.log("what is socket: ", socket);
    console.log("socket is active to be connected");
    console.log(socket.join)

    socket.on("chat", (payload) => {
        console.log("what is our payload: ", payload);
        io.emit("chat", payload)
    })
});

// app.listen(5000, () => console.log("server is active...")); dont do this.

//do this
server.listen(process.env.PORT||5000, () => console.log("server is listening..."));
