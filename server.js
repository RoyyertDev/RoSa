import express from "express";
import session from "express-session";
import logger from "morgan";
import multer from "multer";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { PORT } from "./config/config.js";
import { router } from "./routes/index.js";
import { handleMessage } from "./controllers/messageController.js";
import { loadMessageOfChat } from "./controllers/loadMessageOfChat.js";
import { authVerify } from "./middleware/auth.js";
import { roleVerify } from "./middleware/role.js";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/img/products/"); // Directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName); // Asignamos el nombre final del archivo
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});
const app = express();
const server = createServer(app);
const io = new Server(server, { connectionStateRecovery: {} });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("message", async (message, title, user, conversation) => {
    handleMessage(socket, message, title, user, conversation);
  });

  socket.on("loadChat", async (data) => {
    const messages = await loadMessageOfChat(data);
    socket.idChat = data;
    messages.forEach((message) => {
      handleMessage(socket, message);
    });
  });
});

app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(logger("dev"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/components", express.static(path.join(process.cwd(), "components")));
app.use("/middleware", express.static(path.join(process.cwd(), "middleware")));
app.use("/admin", authVerify, roleVerify, router);
app.use("/", router);

app.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "No se ha enviado ninguna imagen" });
  }

  const fileName = req.file.filename;
  const filePath = `/img/products/${fileName}`;

  res.json({ status: "success", message: "Producto registrado exitosamente" });
});

server.listen(PORT, () => {
  console.log(`Corriendo en el puerto http://localhost:${PORT}`);
});
