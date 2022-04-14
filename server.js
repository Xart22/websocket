const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre
app.use(express.json());
var client = -1;

io.on("connection", (socket) => {
  client++;
  io.emit("total-user", client);
  console.log(socket.id);

  socket.on("disconnect", () => {
    client--;
    io.emit("total-user", client);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});
