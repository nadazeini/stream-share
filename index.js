const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
// const http = require("http").Server(app);
// const io = require("socket.io")(http);
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (request, response) => response.render("index"));

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket.server.engine.clientsCount);
  socket.on("change", (arg) => {
    io.emit("change", { status: arg.status, time: arg.time });
  });
});
