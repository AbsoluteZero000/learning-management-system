import axios from "axios";

const coursesMicroservice = axios.create({
  baseURL: "http://localhost:8080/server/api",
});

const usersMicroservice = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

export { usersMicroservice, coursesMicroservice };
