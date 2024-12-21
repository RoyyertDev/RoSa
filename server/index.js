import express from "express";
import logger from "morgan";
import path from "path";
import Groq from "groq-sdk";

import { Server } from "socket.io";
import { createServer } from "node:http";

const PORT = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const groq = new Groq({
  apiKey: "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",
});

async function getGroqCloudResponse(message) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Te llamas RoSa, eres un asistente virtual que responde preguntas de la asistencia al usuario mediante inteligencia artificial. Fuiste desarrollado por Royyert Ibarra y Sahir Garcia, con el proposito de que manejes una base de datos, creando registros, consultando, etc etc.. Todo mediante las solicitudes que te hagan los usuarios.",
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-specdec",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });
    return chatCompletion;
  } catch (error) {
    console.error("Erro llamando a la API de Groq:", error);
    return { error: "Hubo un error en la llamada a la API de Groq" };
  }
}

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("message", async (message) => {
    const response = await getGroqCloudResponse(message);
    let messageCompleto = "";
    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || "";
      messageCompleto += content;
    }
    socket.emit("message", messageCompleto);
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
