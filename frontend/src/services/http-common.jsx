import axios from "axios";
export default axios.create({
  baseURL: "https://mekanbul-26aralik.vercel.app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});
