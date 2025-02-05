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

  // Aqui se le pide que responda una instancia SQL
  const response = await getGroqCloudResponse(message, conversation, user);
  let messageFull = "";

  // Juntamos la respuesta
  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content || "";
    messageFull = messageFull + content;
  }
  conversation.push({ message: message, from: "User" });
  conversation.push({ message: messageFull, from: "SQL" });

  // Le enviamo la instancia SQL al backend
  const responseFetch = await sqlRequest(messageFull);
  conversation.push({ message: responseFetch, from: "Respuesta SQL" });

  // // Le enviamos la respuesta del backed (success or error) a la ia para que genere una nueva un mensaje para el fronted
  const response2 = await getGroqCloudResponse(
    null,
    conversation, // Hacer que esto se mantenga actualizado
    null,
    responseFetch
  );
  let messageFull2 = "";

  // // Juntamos la respuesta de la ia que va hacia el fronted
  for await (const chunk of response2) {
    const content = chunk.choices[0]?.delta?.content || "";
    socket.emit("message", { message: content, from: "Bot" });
    messageFull2 = messageFull2 + content;
  }

  // Guardamos el mensaje del bot hacia el usuario en la base de datos
  saveMessage(socket.idChat, 2, messageFull2);

  // Le enviamos el mensaje del bot hacia el fronted para finalizar el mensaje
  socket.emit("message", {
    message: "",
    from: "Bot",
    complete: true,
    msjAll: messageFull2,
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

async function sqlRequest(sql) {
  try {
    const response = await fetch("http://localhost:3000/api/sqlRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }),
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
