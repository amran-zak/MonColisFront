import http from "../server";


const API_URL_TRAJET= http.API_URL_TRAJET;

const addTrajet =  async (data) => {
   try {
        const response = await API_URL_TRAJET.post(
            "/add-trajet", { data: data }
        );
        return response;
    } catch (err) {
        return err;
    }
}

const getReservation =  async (_id_em) => {
    try {
         const response = await API_URL_TRAJET.post(
             "/my-reservations", { _id_em: _id_em }
         );
         return response;
     } catch (err) {
         return err;
     }
 }

 const annulerReservation =  async (id) => {
    try {
         const response = await API_URL_TRAJET.get(
             "/my-reservations/annuler/" + id
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


export default {
    addTrajet,
    getReservation,
    annulerReservation,
    deleteReservation
};