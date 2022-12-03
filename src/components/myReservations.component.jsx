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
                        <th>date d'arrivée</th>
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
                            <td>{new Date(item.depart_date).toDateString()}</td>
                            <td>{new Date(item.arrival_date).toDateString()}</td>
                            <td>
                                {(!item.shipped && date < new Date(new Date(item.depart_date).setDate(new Date(item.depart_date).getDate() - 1))) ? (
                                    <button href={"/my-reservati ons/annuler:" + item.id} className="card-link" onClick={() => annuler(item.id)}>
                                        Annuler
                                    </button>
                                ) : (
                                    <div></div>
                                )}
                            </td>
                            <td>
                            {item.shipped ? (
        <div href={"/my-reservations/delete:" + item.id} className="card-link" onClick={() => delete_r(item.id)}>
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
    {(!item.shipped && date < new Date(new Date(item.depart_date).setDate(date.getDate() - 1))) ? (
        <button href={"/my-reservati ons/annuler:" + item.id} className="card-link" onClick={() => annuler(item.id)}>
            Annuler
        </button>
    ) : (
        <div></div>
    )}

    {item.shipped ? (
        <div href={"/my-reservations/delete:" + item.id} className="card-link" onClick={() => delete_r(item.id)}>
            Supprimer
        </div>
    ) : (
        <div></div>
    )}

</div><hr />
</div> */}

function MyReservations() {
    const currentUser = AuthService.getCurrentUser();

    const [colis, setColis] = useState(undefined);
    const [colis_shipped, setColis_shipped] = useState(undefined);
    const [message, setMessage] = useState(undefined);

    useEffect(() => {
        if(currentUser){

       
        TrajetService.getReservation(currentUser.id).then(response => {
            let temp = []
            let temp_shipped = []
            console.log(response.data)
            if (response.data.data) {
                response.data.data.forEach(element => {
                    element.shipped ?
                        temp_shipped.push({
                            id: element._id,
                            depart_city: element._id_trajet[0].depart_city,
                            depart_country: element._id_trajet[0].depart_country,
                            dest_city: element._id_trajet[0].dest_city,
                            dest_country: element._id_trajet[0].dest_country,
                            depart_date: element._id_trajet[0].depart_date,
                            arrival_date: element._id_trajet[0].arrival_date,
                            name: element._id_passager[0].name,
                            weight: element.weight,
                            price: element.price,
                            total_price: element.total_price,
                            shipped: element.shipped,
                        })
                        :
                        temp.push({
                            id: element._id,
                            depart_city: element._id_trajet[0].depart_city,
                            depart_country: element._id_trajet[0].depart_country,
                            dest_city: element._id_trajet[0].dest_city,
                            dest_country: element._id_trajet[0].dest_country,
                            depart_date: element._id_trajet[0].depart_date,
                            shipped: element.shipped,
                            arrival_date: element._id_trajet[0].arrival_date,
                            name: element._id_passager[0].name,
                            weight: element.weight,
                            price: element.price,
                            total_price: element.total_price,
                        })
                })
                setColis(temp)
                setColis_shipped(temp_shipped)
            } else {
                setMessage(response.data.message)
            };


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
                    <h1> Mes colis en cours</h1>
                    <Child data={colis} setChild={setColis} />

                    <h1>Mes colis livrés</h1>
                    <div>

                    </div>
                    <Child data={colis_shipped} setChild={setColis_shipped} />
                </div>
            ) : (
                <div>
                    <h1>{message}</h1>
                </div>
            )}

        </div>
    );
};

export default MyReservations;
