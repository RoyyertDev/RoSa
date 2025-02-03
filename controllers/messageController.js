import { getGroqCloudResponse } from "../services/groqService.js";
import { createChat } from "../controllers/chatControllers.js";

export async function handleMessage(
  socket,
  message,
  title,
  user,
  conversation
) {
  if (!socket.idChat && title && user) {
    socket.idChat = await createChat(title, user);
    socket.emit("newChat", socket.idChat);
  }
  if (message.fk_author) {
    socket.emit("message", {
      message: message.content,
      from: message.fk_author === 1 ? "User" : "Bot",
      complete: true,
      msjAll: message.content,
    });
    return;
  }
  socket.emit("message", {
    message: message,
    from: "User",
    complete: true,
    msjAll: message,
  });
  saveMessage(socket.idChat, 1, message);
  const response = await getGroqCloudResponse(message, conversation);
  let messageFull = "";
  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content || "";
    socket.emit("message", { message: content, from: "Bot" });
    messageFull = messageFull + content;
  }
  saveMessage(socket.idChat, 2, messageFull);
  socket.emit("message", {
    message: "",
    from: "Bot",
    complete: true,
    msjAll: messageFull,
  });
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
