import { getGroqCloudResponse } from "../services/groqService.js";

export async function handleMessage(socket, message) {
  socket.emit("message", { message: message, from: "User", complete: true });
  const response = await getGroqCloudResponse(message);
  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content || "";
    socket.emit("message", { message: content, from: "Bot" });
  }
  socket.emit("message", { message: "", from: "Bot", complete: true });
  // Aqui va la relacion BD
}
