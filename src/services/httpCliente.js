import axios from "axios";

const localHost = "http://localhost:8080/";
const debug_url =
  "https://ba94-2605-59c8-680d-2e10-e92d-eaee-d7d9-9364.ngrok-free.app/";
const api_Url = ""; //Api en produccion

export default axios.create({
  baseURL: debug_url,
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-type": "application/json",
    accept: "text/plain",
  },
  //timeout: 7000
});

//desintalar todas las librerias que no se van a usar