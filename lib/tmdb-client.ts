import axios from "axios";

export const tmdbClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "en-US", 
  },
});