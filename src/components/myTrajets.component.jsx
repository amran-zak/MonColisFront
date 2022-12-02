import React, { useEffect, useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import TrajetService from "../services/trajets.service";
import AuthService from "../services/auth.service";




function Child({ data, setChild }) {
    const date = new Date()





    const annuler = (id) => {
        id ?
            TrajetService.annulerReservation(id).then(response => {
                data = data.filter((d) => d.id != id)
                setChild(data)
            }).catch(err => console.log(err.message)) :
            console.log(id)
    }

    const delete_r = (id) => {

        id ?
            TrajetService.deleteReservation(id).then(response => {
                data = data.filter((d) => d.id != id)
                setChild(data)
            }).catch(err => console.log(err.message)) :
            console.log(id)
    }



    return (
        <>
            <div className="Result">
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Ville de départ</th>
                        <th>Ville d'arrivée</th>
                        <th>poids</th>
                        <th>prix</th>
                        <th>prix Total</th>
                        <th>date débart</th>
                    </tr>
                    {data.map(item => (

                        <tr key={item.id}>
                            <td>
                                <h3>
                                    {item.name}
                                </h3>
                            </td>


                            <td>{item.depart_city}</td>
                            <td>{item.dest_city}</td>
                            <td>{item.weight}</td>
                            <td>{item.price}</td>
                            <td>{item.total_price}</td>
                            <td>{item.depart_date}</td>
                            <td>
                                {(!item.available && date < new Date(new Date(item.depart_date).setDate(new Date(item.depart_date).getDate() - 1))) ? (
                                    <button href={"/my-reservati ons/annuler:" + item.id} className="card-link" onClick={() => annuler(item.id)}>
                                        Annuler
                                    </button>
                                ) : (
                                    <div></div>
                                )}
                            </td>
                            <td>
                                {!item.available ? (
                                    <div href={"/my-trajets/delete:" + item.id} className="card-link" onClick={() => delete_r(item.id)}>
                                        Supprimer
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </td>
                        </tr>

                    ))
                    }
                </table>
            </div>
        </>
    );
}


{/* <div className="card" key={item.id}>
<div className="card-body">
    <h3 className="card-subtitle mb-2 text-muted">{item.depart_city} {'-->'} {item.dest_city}</h3>
    {(!item.available && date < new Date(new Date(item.depart_date).setDate(date.getDate() - 1))) ? (
        <button href={"/my-reservati ons/annuler:" + item.id} className="card-link" onClick={() => annuler(item.id)}>
            Annuler
        </button>
    ) : (
        <div></div>
    )}

    {item.available ? (
        <div href={"/my-reservations/delete:" + item.id} className="card-link" onClick={() => delete_r(item.id)}>
            Supprimer
        </div>
    ) : (
        <div></div>
    )}

</div><hr />
</div> */}

function MyTrajets() {
    const currentUser = AuthService.getCurrentUser();

    const [trajets, setTrajets] = useState(undefined);
    const [trajets_available, setTrajets_available] = useState(undefined);
    const [message, setMessage] = useState(undefined);

    useEffect(() => {
        if (currentUser) {


            TrajetService.getTrajets(currentUser.id).then(response => {
                let temp = []
                let temp_available = []
                if (response.data.data) {
                    response.data.data.forEach(element => {
                        element.available ?
                            temp_available.push({
                                id: element._id,
                                depart_city: element.depart_city,
                                dest_city: element.dest_city,
                                depart_date: element.depart_date,
                                arrival_date: element.arrival_date,
                                weight: element.weight,
                                price: element.price,
                                available: element.available,
                            })
                            :
                            temp.push({
                                id: element._id,
                                depart_city: element.depart_city,
                                dest_city: element.dest_city,
                                depart_date: element.depart_date,
                                available: element.available,
                                arrival_date: element.arrival_date,
                                weight: element.weight,
                                price: element.price
                            })
                    })
                    setTrajets(temp)
                    setTrajets_available(temp_available)
                } else {
                    setMessage(response.data.message)
                };

            }).catch(e => {
                console.log(e);
            });
        }
    },
        [])
    if (!currentUser) {
        return <Navigate replace to="/login" />;
    }


    return (
        <div className="container">

            {trajets ? (
                <div>
                    <h1> Mes trajets disponnible </h1>
                    <Child data={trajets_available} setChild={setTrajets_available} />

                    <h1> Mes trajets reservés </h1>
                    <div>
                        {/* <Child data={trajets_available} setChild={setTrajets_available} /> */}
                    </div>

                    <h1> Mes trajets indisponnible </h1>
                    <Child data={trajets} setChild={setTrajets} />


                </div>
            ) : (
                <div>
                    <h1>{message}</h1>
                </div>
            )}

        </div>
    );
};

export default MyTrajets;
