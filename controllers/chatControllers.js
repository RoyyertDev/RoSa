export async function createChat(title) {
  try {
    const response = await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fk_user: 1, title, date: new Date() }),
    });
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}
