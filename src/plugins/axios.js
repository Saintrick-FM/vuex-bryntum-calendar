
import axios from "axios";

//const api = axios.create({ baseURL: 'https://api.example.com' })
const api = axios.create({
 baseURL: "http://localhost:9000/" // my api root endpoint 
});


export { api };
