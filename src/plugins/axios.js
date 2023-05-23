
import axios from "axios";

const api = axios.create({
 baseURL: "http://localhost:9000/" // l'endpoint de mon api
});


export { api };
