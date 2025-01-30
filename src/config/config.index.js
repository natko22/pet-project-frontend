// config/config.index.js
export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5005"
    : "https://pet-project-backend-bxma.onrender.com";
