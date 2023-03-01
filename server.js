import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app); // create a new HTTP server instance with app as the request listener,which provides routing and middleware functionalities for handling HTTP requests.

// const Server = socket.Server;
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}); //creates a new Socket.IO instance and attaches it to an HTTP server. This allows for real-time, bidirectional communication between the server and clients using websockets.;

io.on("connection", (socket) => {
  console.log(`Client has connected-${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("received_message", data);
  });

  // socket.on("room", (data) => {
  //   console.log(data);
  //   socket.join(data);
  // });

  // socket.on("message", (data) => {
  //   console.log(data);
  //   socket.to(data.room).emit("receive_message", data);
  // });

  socket.on("disconnect", () => {
    console.log("Client has disconnected");
  });
});

server.listen(PORT, () => {
  console.log("server is up and running");
});
