export async function loadMessageOfChat(idChat) {
  try {
    const response = await fetch(`http://localhost:3000/api/chats/${idChat}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.log(error);
  }
}
