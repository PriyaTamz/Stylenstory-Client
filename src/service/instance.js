import axios from "axios";

const baseurl =
    process.env.NODE_ENV === "production"
        ? "https://menstshirtstore-backend.onrender.com"
        : "http://localhost:5000"; 

const instance = axios.create({
    baseURL: baseurl,
    //timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;