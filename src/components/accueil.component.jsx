import React, { useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

import '../css/resultatrecherche.css'

import TrajetService from "../services/trajets.service";
import AuthService from "../services/auth.service";

import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

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
        alert("Login")
        return <navigate replace to="/login" />;
    }

    const form = useRef();
    const [messageR, setMessageR] = useState(undefined);

    const [_id_trajet, set_id_trajet] = useState("");
    const [_id_passager, set_id_passager] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");

  
    const reserve = (item) => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            returnLogin()
        } else {
            set_id_trajet(item._id)
            set_id_passager(item.passenger[0]._id)
            setPrice(item.price)
            if (weight <= item.weight) {
                item.weight = item.weight - weight
            }
        }
    }
    const onChangeWeight = (e) => {
        const weight = e.target.value;
        setWeight(weight);
    };





    const handleReserveTrajet = (e) => {

        e.preventDefault();
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            returnLogin()
        } else {

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
                {/* <table>
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
                </table> */}

                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Nom</th>
                            <th scope='col'>Trajet</th>
                            <th scope='col'>Poid disponible</th>
                            <th scope='col'>Prix</th>
                            <th scope='col'>Reservation</th>

                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {data.map(item => (
                            <tr key={item._id}>

                                <td>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src='https://tse3.mm.bing.net/th?id=OIP.dLfpF42QdcvxBbTGL0ylYgHaHa&pid=Api&P=0'
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{item.passenger[0].name}</p>
                                            <p className='text-muted mb-0'>{item.passenger[0].email}</p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <p className='fw-normal mb-2'>{item.depart_city} <i class="fa fa-arrow-right" aria-hidden="true"></i> {item.dest_city}</p>

                                    <p   className='text-muted mb-0'>
                                    {new Date(item.depart_date).toDateString()}  <i class="fa fa-arrow-right" aria-hidden="true"></i> {new Date(item.arrival_date).toDateString()}
                                </p>
                                </td>

                                <td>
                                    <MDBBadge color='success' pill>
                                        {item.weight} KG
                                    </MDBBadge>
                                </td>


                                <td>
                                    <p className='fw-normal mb-2'> 1 kg <i class="fa fa-arrow-right" aria-hidden="true"></i> {item.price} €</p>

                                    <p   className='text-muted mb-0'>
                                    {weight } kg  <i class="fa fa-arrow-right" aria-hidden="true"></i> {item.price * weight} €
                                </p>
                                </td>

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
                                                <form onSubmit={handleReserveTrajet} ref={form}>
                                                      <label htmlFor="price_total" name='test' value>
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
 </label>
                                                  
                                                    <button   onClick={() => reserve(item)}  className="button-reserve">
                                    Réserver
                                </button>
                                                </form>
                                            )
                                    }

                                </td>


                            </tr>

                        ))
                        }
                    </MDBTableBody>
                </MDBTable>

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


        var data = {
            depart_city: depart_city,
            dest_city: dest_city
        };
        console.log(data)
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

    };


    return (
        <div> <div>

            <div className="banner-container">
                <div className="text-center">
                    <div className="App">
                        <div classname="container h-100">
                            <div classname="row h-100 justify-content-center align-items-center"></div>
                            <h1 className=" text-6xl text-orange-600 font-bold">Welcome to MonColis</h1>
                            <h4 className="text-4xl mt-8 text-black">Rechercher un trajet</h4>
                            <div className="inputs-search-div">
                            <InputGroup className="inputs-search">
                                <FormControl
                                    placeholder="Ville de départ "
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                    name="depart_city"
                                    value={depart_city}
                                    onChange={onChangeDepart_city}
                                    validations={[required]}
                                />

                            </InputGroup>
                            <br />
                            <InputGroup className="inputs-search">
                                <FormControl
                                    placeholder="Ville d'arrivé"
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                    name="dest_city"
                                    value={dest_city}
                                    onChange={onChangeDest_city}
                                    validations={[required]}
                                />
                            </InputGroup>
                            <br />
                            <Button variant="primary" id="button-addon2" onClick={handleAddTrajet}>
                                Search
                            </Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
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

            
        </div>

          
        </div>
    );
}

export default Accueil;