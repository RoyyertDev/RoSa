import express from "express";
import logger from "morgan";
import path from "path";

import { Server } from "socket.io";
import { createServer } from "node:http";

const PORT = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("message", (message) => {
    io.emit("message", message);
    // Aqui va la relacion BD
  });
});

app.use(logger("dev"));

app.use(express.static(path.join(process.cwd(), "src")));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/dashboard.html");
});

app.get("/users", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/users.html");
});

app.get("/foods", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/foods.html");
});

app.get("/items", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/items.html");
});

app.get("/products", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/products.html");
});

server.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
