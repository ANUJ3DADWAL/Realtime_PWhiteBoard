const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("size", (size) => {
    console.log("Size event received:", size);
    socket.broadcast.emit("onsize", size);
  });

  socket.on("color", (color) => {
    console.log("Color event received:", color);
    socket.broadcast.emit("oncolor", color);
  });

  socket.on("toolchange", (tool) => {
    console.log("Tool change event received:", tool);
    socket.broadcast.emit("ontoolchange", tool);
  });

  socket.on("hamburger", () => {
    console.log("Hamburger event received");
    socket.broadcast.emit("onhamburger");
  });

  socket.on("mousedown", (point) => {
    console.log("Mousedown event received:", point);
    socket.broadcast.emit("onmousedown", point);
  });

  socket.on("mousemove", (point) => {
    console.log("Mousemove event received:", point);
    socket.broadcast.emit("onmousemove", point);
  });

  socket.on("undo", () => {
    console.log("Undo event received");
    socket.broadcast.emit("onundo");
  });

  socket.on("redo", () => {
    console.log("Redo event received");
    socket.broadcast.emit("onredo");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server has started at port ${port}`);
});