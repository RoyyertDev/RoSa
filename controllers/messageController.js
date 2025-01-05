import { getGroqCloudResponse } from "../services/groqService.js";
import { createChat } from "../controllers/chatControllers.js";

export async function handleMessage(socket, message, title) {
  if (!socket.idChat && title) {
    socket.idChat = await createChat(title);
  }
  socket.emit("message", { message: message, from: "User", complete: true });
  saveMessage(socket.idChat, 1, message);
  const response = await getGroqCloudResponse(message);
  let messageFull = "";
  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content || "";
    socket.emit("message", { message: content, from: "Bot" });
    messageFull = messageFull + content;
  }
  saveMessage(socket.idChat, 2, messageFull);
  socket.emit("message", { message: "", from: "Bot", complete: true });
}

function saveMessage(idChat, from, message) {
  try {
    fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fk_chats: idChat,
        fk_author: from,
        date: new Date(),
        content: message,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}
