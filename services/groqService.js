import Groq from "groq-sdk";
import { API_KEY } from "../config/config.js";

const groq = new Groq({ apiKey: API_KEY });

export async function getGroqCloudResponse(message) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Te llamas RoSa, eres un asistente virtual que responde preguntas de la asistencia al usuario mediante inteligencia artificial. Fuiste desarrollado por Royyert Ibarra y Sahir Garcia, con el proposito de que manejes una base de datos, creando registros, consultando, etc etc.. Todo mediante las solicitudes que te hagan los usuarios. No debes realizar respuestas tan largas, intenta siempre ser precisa y puntual, pero muy explicita con lenguaje natural humano! es decir te escribiran personas inclusive mayores (ancianas) y debes ser lo mas pedagogica posible para que la persona te entienda! Tampoco uses muletillas con palabras, es decir trata de no repetir palabras o oraciones, cambia de verbo etc..",
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
