import React, {  useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

import TrajetService from "../services/trajets.service";

import AuthService from "../services/auth.service";





const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire!
      </div>
    );
  }
};




function AddTrajets() {
  
//AIzaSyA0Dn6zefo7LDApySiGQVl0vhFjnnVkV4s
const currentUser = AuthService.getCurrentUser();





  const form = useRef();
  const checkBtn = useRef();



  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [depart_city, setDepart_city] = useState("");
  const [depart_country, setDepart_country] = useState("");
  const [dest_city, setDest_city] = useState("");
  const [dest_country, setDest_country] = useState(""); 
  const [depart_date, setDepart_date] = useState("");
  const [arrival_date, setArrival_date] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [passenger, setPassenger] = useState("");
 

  



  const onChangeDepart_city = (e) => {
    const depart_city = e.target.value;
    setDepart_city(depart_city);
  };
  const onChangeDepart_country = (e) => {
    const depart_country = e.target.value;
    setDepart_country(depart_country);
  };
  
  const onChangeDest_city = (e) => {
    const dest_city = e.target.value;
    setDest_city(dest_city);
  };

  const onChangeDest_country = (e) => {
    const dest_country = e.target.value;
    setDest_country(dest_country);
  };

  const onChangeDepart_date = (e) => {
    const depart_date = e.target.value;
    setDepart_date(depart_date);
  };

  const onChangeArrival_date = (e)  => {
    const arrival_date = e.target.value;
    setArrival_date(arrival_date)
  }

  const onChangeWeight = (e)  => {
    const weight = e.target.value;
    setWeight(weight)
  }

  const onChangePrice = (e)  => {
    const price = e.target.value;
    setPrice(price)
  }



  const handleAddTrajet = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      var data = {
        depart_city : depart_city,
        depart_country: depart_country,
        dest_city: dest_city,
        dest_country: dest_country,
        depart_date: depart_date,
        arrival_date: arrival_date,
        weight: weight,
        price: price,
        passenger: currentUser.id
      };
      TrajetService.addTrajet(data).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        }).catch(
        (error) => {
          setMessage(error.message);
          setSuccessful(false);
        }
      );
    }
  };


  if (!currentUser) {
    return <Navigate replace to="/login" />;
  }
  
  return (
    <div className="container">

      <div className="sous-container">
        <div>
          <h3>Ajouter un Trajet</h3>
          <div className="form-Trajet">
          
            <Form onSubmit={handleAddTrajet} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group" >
                    <label htmlFor="depart_city">Ville départ <span className="etoilobligatoire">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="depart_city"
                      value={depart_city}
                      onChange={onChangeDepart_city}
                      validations={[required]}
                    /> 
                  </div> 
                  {/* Select automatique */}



                  <div className="form-group" >
                    <label htmlFor="depart_country">Pays départ <span className="etoilobligatoire">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="depart_country"
                      value={depart_country}
                      onChange={onChangeDepart_country}
                      validations={[required]}
                    /> 
                  </div> {/* generate automatique */}

                  <div className="form-group" >
                    <label htmlFor="dest_city">Ville Destination <span className="etoilobligatoire">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="dest_city"
                      value={dest_city}
                      onChange={onChangeDest_city}
                      validations={[required]}
                    /> 
                  </div> {/* Select automatique */}

                  <div className="form-group" >
                    <label htmlFor="dest_country">Pays destination <span className="etoilobligatoire">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="dest_country"
                      value={dest_country}
                      onChange={onChangeDest_country}
                      validations={[required]}
                    /> 
                  </div> {/* generate automatique */}

                  <div className="form-group" >
                    <label htmlFor="depart_date">Date départ <span className="etoilobligatoire">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="depart_date"
                      value={depart_date}
                      onChange={onChangeDepart_date}
                      validations={[required]}
                    /> 
                  </div> {/* OK */}
  
                  <div className="form-group" >
                    <label htmlFor="arrival_date">Date d'arrivée <span className="etoilobligatoire">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="arrival_date"
                      value={arrival_date}
                      onChange={onChangeArrival_date}
                      validations={[required]}
                    /> 
                  </div> {/* OK */}

                  <div className="form-group" >
                    <label htmlFor="weight">Poids (kg) <span className="etoilobligatoire">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      name="weight"
                      value={weight}
                      onChange={onChangeWeight}
                      validations={[required]}
                    /> 
                  </div> {/* OK */}

                  <div className="form-group" >
                    <label htmlFor="price">Prix ( € /kg) <span className="etoilobligatoire">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={price}
                      onChange={onChangePrice}
                      validations={[required]}
                    /> 
                  </div>{/* OK */}

                  

                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Créer</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AddTrajets;