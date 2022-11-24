import axios from "axios";

const APIs = {}
const URL = "http://localhost:8080/"


APIs.API_URL_AUTH = axios.create({
  baseURL:  URL + "/api/auth",
  headers: {
    "Content-type": "application/json"
  }
});



APIs.API_URL_TRAJET= axios.create({
  baseURL:  URL + "api/trajet",
  headers: {
    "Content-type": "application/json"
  }
});

export default APIs;