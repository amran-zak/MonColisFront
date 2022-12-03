import http from "../server";
import authHeader from "./auth.headers";


const API_URL_ADMIN= http.API_URL_ADMIN;


const getAllUsers =  async () => {
    try {
         const response = await API_URL_ADMIN.get(
             "/get-all-users", { headers: authHeader() }
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 const getAllTrajets =  async () => {
    try {
         const response = await API_URL_ADMIN.get(
             "/get-all-trajets", { headers: authHeader() }
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 const getAllColis =  async () => {
    try {
         const response = await API_URL_ADMIN.get(
             "/get-all-colis", { headers: authHeader() }
         );
         return response;
     } catch (err) {
         return err;
     }
 }

export default {
    getAllTrajets,
    getAllUsers,
    getAllColis
};