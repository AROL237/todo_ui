const { default: axios } = require("axios");

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
    // "Cache-Control": "no-cache, no-store, must-revalidate",
    // Pragma: "no-cache",
    // Expires: "0",
  },
});
