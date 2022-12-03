import http from "../server";
import authHeader from "./auth.headers";


const API_URL_TRAJET= http.API_URL_TRAJET;


const searchTrajet =  async (data) => {
    try {
         const response = await API_URL_TRAJET.post(
             "/search-trajet", { data: data }
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 const reserveTrajet =  async (data) => {
    try {
         const response = await API_URL_TRAJET.post(
             "/reserve-trajet", {headers: authHeader(), data: data }
         );
         return response;
     } catch (err) {
         return err;
     }
 }



const addTrajet =  async (data) => {
   try {
        const response = await API_URL_TRAJET.post(
            "/add-trajet", { headers: authHeader(), data: data }
        );
        return response;
    } catch (err) {
        return err;
    }
}

const getReservation =  async (_id_em) => {
    try {
         const response = await API_URL_TRAJET.post(
             "/my-reservations" , {headers: authHeader(), _id_em: _id_em }
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 const annulerReservation =  async (id) => {
    try {
         const response = await API_URL_TRAJET.get(
             "/my-reservations/annuler/" + id, {headers: authHeader()}
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 
 const deleteReservation =  async (id) => {
    try {
         const response = await API_URL_TRAJET.delete(
             "/my-reservations/delete/" + id
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 const getTrajets =  async (_id_passager) => {
    try {
         const response = await API_URL_TRAJET.post(
             "/my-trajets" , {headers: authHeader(), _id_passager: _id_passager }
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 const getMyTrajetsReserved =  async (_id_passager) => {
    try {
         const response = await API_URL_TRAJET.post(
             "/my-trajets-reserve" , {headers: authHeader(), _id_passager: _id_passager }
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 const confirmLivraison =  async (id) => {
    try {
        console.log(id)
         const response = await API_URL_TRAJET.get(
             "/my-trajets/confirm/" + id, {headers: authHeader()}
         );
         return response;
     } catch (err) {
         return err;
     }
 }


export default {
    searchTrajet,
    reserveTrajet,
    addTrajet,
    getReservation,
    annulerReservation,
    deleteReservation,
    getTrajets,
    getMyTrajetsReserved,
    confirmLivraison
};