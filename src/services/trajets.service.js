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





export default {
    addTrajet
};