import http from "../server";



const API_URL_AUTH = http.API_URL_AUTH;


const register = async (email, phone, name, password) => {
  try {
    const response = await API_URL_AUTH.post(
      "/sign-in", {  email,
        phone,
        name,
        password,
      
      }
  );
  return response;
  } catch (error) {
    return error;
  }
}

const Log_in = async (email, password) => {
  try {
    const response = await API_URL_AUTH.post(
      "/login", {  email, password,}
  );
  if (response.data.id) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
  } catch (error) {
    return error;
  }
}


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

;
export default {
    register,
    Log_in,
    getCurrentUser
};