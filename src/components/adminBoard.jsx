import React, { useEffect, useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import AdminService from "../services/admin.service";
import AuthService from "../services/auth.service";




function Child_colis({ data }) {

    return (
        <>
            <div className="Result">
                <table>
                    <tr>
                        <th>Passager</th>
                        <th>Ville de départ</th>
                        <th>Ville d'arrivée</th>
                        <th>poids</th>
                        <th>prix Total</th>
                        <th>date débart</th>
                        <th>Date d'arrivée</th>
                        <th>Client</th>
                    </tr>
                    {data.map(item => (

                        <tr key={item._id}>
                            <td>
                                <h3>
                                    {item._id_passager[0].name}
                                </h3>
                            </td>


                            <td>{item._id_trajet[0].depart_city}</td>
                            <td>{item._id_trajet[0].dest_city}</td>
                            <td>{item.weight} kg</td>
                            <td>{item.total_price} €</td> 
                            <td>{new Date(item._id_trajet[0].depart_date).toDateString()}</td>
                            <td>{new Date(item._id_trajet[0].arrival_date).toDateString()}</td>
                            <td>{item._id_em[0].name}</td>
                        </tr>

                    ))
                    }
                </table>
            </div>
        </>
    );
}

function Child_trajets({ data }) {

    return (
        <>
            <div className="Result">
                <table>
                    <tr>
                        <th>Passager</th>
                        <th>Ville de départ</th>
                        <th>Ville d'arrivée</th>
                        <th>poids</th>
                        <th>prix</th>
                        <th>date débart</th>
                        <th>Date d'arrivée</th>
                    </tr>
                    {data.map(item => (

                        <tr key={item._id}>
                            <td>
                                <h3>
                                    {item.passenger[0].name}
                                </h3>
                            </td>


                            <td>{item.depart_city}</td>
                            <td>{item.dest_city}</td>
                            <td>{item.weight} kg</td>
                            <td>{item.price} €</td>
                            <td>{new Date(item.depart_date).toDateString()}</td>
                            <td>{new Date(item.arrival_date).toDateString()}</td>
                        </tr>

                    ))
                    }
                </table>
            </div>
        </>
    );
}

function Child_users({ data }) {
    return (
        <>
            <div className="Result">
                <table>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Phone</th>
                    </tr>
                    {data.map(item => (

                        <tr key={item._id}>
                            <td>
                                <h3>
                                    {item.email}
                                </h3>
                            </td>


                            <td>{item.name}</td>
                            <td>{item.phone}</td>

                        </tr>

                    ))
                    }
                </table>
            </div>
        </>
    );
}

function AdminBoard() {
    const currentUser = AuthService.getCurrentUser();

    const [colis, setColis] = useState(undefined);
    const [trajets, setTrajets] = useState(undefined);
    const [users, setUsers] = useState(undefined);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (currentUser) {
            AdminService.getAllUsers().then(response => {
                if (response.response) {
                    setMessage(response.response.data.message)
                } else {
                    setUsers(response.data.data)
                }
            }).catch(e => {
                console.log(e);
            });

            AdminService.getAllTrajets().then(response => {
                if(response.response){
                    setMessage(response.response.data.message)
                }else{
                    console.log(response)
                    setTrajets(response.data.data)
                }
            }).catch(e => {
                console.log(e.message);
            });

            AdminService.getAllColis().then(response => {
                if (response.response) {
                    setMessage(response.response.data.message)
                } else {
                    setColis(response.data)
                }
            }).catch(e => {
                console.log(e.message);
            });

        }
    },
        [])
    if (!currentUser) {
        return <Navigate replace to="/login" />;
    }


    return (
        <div className="container">

            {colis ? (
                <div>
                    <h1>Les colis</h1>
                    <Child_colis data={colis} setChild={setColis} />
                </div>
            ) : (
                <div>
                    <h1>{message}</h1>
                </div>
            )}

            {trajets ? (
                <div>
                    <h1>Les trajets</h1>
                    <Child_trajets data={trajets} />
                </div>
            ) : (
                <div>
                    <h1>{message}</h1>
                </div>
            )}

            {users ? (
                <div>
                    <h1>Les users</h1>
                    <Child_users data={users} />
                </div>
            ) : (
                <div>
                    <h1>{message}</h1>
                </div>
            )}

        </div>
    );
};

export default AdminBoard;
