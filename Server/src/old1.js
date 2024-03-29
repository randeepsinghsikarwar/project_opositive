const { spawn } = require("child_process");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUser = [];

function testing(){
  return new Promise((resolve, reject) => {
      const childPython = spawn("python", ["main1.py"]);
      childPython.stdout.on("data", (data) => {
        const result = data.toString().trim();
        resolve(result);
      });
      childPython.on("error", (err)=> {
        console.log(err)
        reject(err);
      })
  });
  
}

function sentimentAnalysis(m) {
  const childPython = spawn("python", ["main.py", m]);
  return new Promise(async (resolve, reject) => {
    try {
      childPython.stdout.on("data", (data) => {
        const result = data.toString().trim();
        resolve(result);
      });

      childPython.on("error", (err) => {
        console.error("Error executing Python process:", err);
        reject(err);
      });

      childPython.on("close", (code) => {
        if (code !== 0) {
          console.error(`Python process exited with code ${code}`);
          reject(`Python process exited with code ${code}`);
        }
      });
    } catch (error) {
      console.error("Error in sentimentAnalysis:", error);
      reject(error);
    }
  });
}

app.get("/", (req, res) => {
  res.send("hello");
});

io.on("connection", (socket) => {
  console.log("connected");

  io.emit("new_user", {
    type: "new_user",
    user_details: socket.id,
    payload: "new user has joined",
  });

  socket.on("addUser", (data) => {
    !onlineUser.some((user) => user.email === data.email) &&
      onlineUser.push({
        userName: data.userName,
        email: data.email,
        socketId: socket.id,
      });
    console.log(onlineUser);
    io.emit("recieve", {
      user_email: data.email,
      type: "AKN",
      user_details: data.user_details,
      messageSent: data.user_details + " has joined",
    });
  });

  socket.on("chat", async (data) => {
    try {
      const sentimeResult = await sentimentAnalysis(data.payload);
      console.log(sentimeResult);
  
      io.emit("recieve", data);
  
      sentimeResult > 0
        ? io.emit("recieve", data)
        : io.emit("recieve", { ...data, payload: "Caution!" });
    } catch (error) {
      console.error("Error in sentimentAnalysis:", error);
      io.emit("recieve", { ...data, payload: "Error in sentiment analysis" });
    }
  });
  

  socket.on("disconnect", () => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
    console.log(onlineUser);
    console.log("disconnected");
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
