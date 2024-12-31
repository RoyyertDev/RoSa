import express from "express";
import logger from "morgan";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { PORT } from "./config/config.js";
import { router } from "./routes/index.js";
import { handleMessage } from "./controllers/messageController.js";

const app = express();
const server = createServer(app);
const io = new Server(server, { connectionStateRecovery: {} });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("message", async (message) => handleMessage(socket, message));
});

app.use(express.json());
app.use(logger("dev"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/components", express.static(path.join(process.cwd(), "components")));
app.use("/", router);
server.listen(PORT, () => {
  console.log(`Corriendo en el puerto http://localhost:${PORT}`);
});
