const axiosBase = require("axios");

const axios = axiosBase.create({
  baseURL: process.env.GH_BASE_URL,
  headers: {
    Authorization: "Bearer " + process.env.GH_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

module.exports = axios;
