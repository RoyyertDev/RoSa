import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const API_KEY = process.env.GROQ_API_KEY;

export { PORT, API_KEY };
