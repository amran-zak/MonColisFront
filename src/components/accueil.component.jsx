import React, { useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

import '../css/resultatrecherche.css'

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



function Child({ data, navigate }) {
    
    const returnLogin = () => {
        alert( "Login" )
        return <navigate replace to="/login" />;
    }
    const form = useRef();
    const [messageR, setMessageR] = useState(undefined);

    const [_id_trajet, set_id_trajet] = useState("");
    const [_id_passager, set_id_passager] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");

    const onChangeWeight = (e) => {
        const weight = e.target.value;
        setWeight(weight);
    };
    
    const reserve = (item) => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
           returnLogin()
        } else {
        set_id_trajet(item._id)
        set_id_passager(item.passenger[0]._id)
        setPrice(item.price)
        if(weight <= item.weight) {
            item.weight = item.weight - weight
        }
        }
    }

   



    const handleReserveTrajet = (e) => {

        e.preventDefault();
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
           returnLogin()
        } else {
            form.current.validateAll();

            let data = {
                weight: weight,
                _id_em: currentUser.id,
                _id_trajet: _id_trajet,
                _id_passager: _id_passager,
                price: price
            };

            TrajetService.reserveTrajet(data).then(
                (response) => {
                    setMessageR(response.data.message);
                }).catch(
                    (error) => {
                        setMessageR(error.message);
                    }
                );
        }


    };
    return (
        <>
            <div className="Result">
                <table>
                    <tbody>
                        <th>Nom</th>
                        <th>Ville de départ</th>
                        <th>Ville d'arrivée</th>
                        <th>poids disponible</th>
                        <th>prix</th>
                        <th>Date débart</th>
                        <th>Date d'arrivé</th>

                    </tbody>
                    {data.map(item => (

                        <tr key={item._id}>
                            <td>
                                <h3>
                                    {item.passenger[0].name}
                                </h3>
                            </td>
                            <td>{item.depart_city}</td>
                            <td>{item.dest_city}</td>
                            <td>{item.weight}</td>
                            <td>{item.price}</td>
                            <td>{item.name}</td>
                            <td>{new Date(item.depart_date).toDateString()}</td>
                            <td>{new Date(item.arrival_date).toDateString()}</td>
                            <td>
                                {
                                    messageR ? (
                                        <div>
                                            <h3>
                                                {messageR}
                                            </h3>
                                        </div>
                                    ) :
                                        (
                                            <Form onSubmit={handleReserveTrajet} ref={form}>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="weight"
                                                    value={weight}
                                                    onChange={onChangeWeight}
                                                    max={item.weight}
                                                    min='0'
                                                    validations={[required]}
                                                />

                                                <label htmlFor="price_total" name='test' value> Prix Totale: {item.price * weight} </label>
                                                <button className="card-link" onClick={() => reserve(item)}>
                                                    Reserver
                                                </button>
                                            </Form>
                                        )
                                }

                            </td>
                        </tr>

                    ))
                    }
                </table>
            </div>
        </>
    );
}




function Accueil() {

    const form = useRef();
    const checkBtn = useRef();



    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [depart_city, setDepart_city] = useState("");
    const [depart_country, setDepart_country] = useState("");
    const [dest_city, setDest_city] = useState("");
    const [dest_country, setDest_country] = useState("");


    const [trajets, setTrajets] = useState(undefined);


    const onChangeDepart_city = (e) => {
        const depart_city = e.target.value;
        setDepart_city(depart_city);
    };


    const onChangeDest_city = (e) => {
        const dest_city = e.target.value;
        setDest_city(dest_city);
    };


    const handleAddTrajet = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            var data = {
                depart_city: depart_city,
                dest_city: dest_city
            };
            TrajetService.searchTrajet(data).then(
                (response) => {
                    if (response.data.message) {
                        setTrajets(undefined)
                        setMessage(response.data.message)
                    } else {
                        setTrajets(response.data)
                    }
                }).catch(
                    (error) => {
                        setMessage(error.message);
                    }
                );
        }
    };


    return (
        <div>
            <h1>Ceci est un Accueil</h1>

            <Form onSubmit={handleAddTrajet} ref={form}>

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




                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Chercher</button>
                    </div>
                </div>

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>


            {
                trajets ? (
                    <div>
                        <Child data={trajets.result} navigate={Navigate} />
                    </div>
                ) :
                    (
                        <div>
                            <h1>{message}</h1>
                        </div>
                    )
            }
        </div>
    );
}

export default Accueil;