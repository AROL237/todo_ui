const { default: axios } = require("axios");

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
