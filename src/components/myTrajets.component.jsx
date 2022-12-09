import React, { useEffect, useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import TrajetService from "../services/trajets.service";
import AuthService from "../services/auth.service";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


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
                {/* <table>
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
                                {(!item.available && date < new Date(new Date(item.depart_date).setDate(new Date(item.depart_date).getDate() - 1))) ? (
                                    <button href={"/my-reservations/annuler:" + item.id} className="card-link" onClick={() => annuler(item.id)}>
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
                </table> */}

                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Trajet</th>
                            <th scope='col'>Poid disponible</th>
                            <th scope='col'>Prix / kg</th>
                            {/* <th>Statut</th> */}
<th>Disponible 🤔 ?</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {data.map(item => (
                            <tr key={item.id}>

                                <td>
                                    <p className='fw-normal mb-2'>{item.depart_city} <i class="fa fa-arrow-right" aria-hidden="true"></i> {item.dest_city}</p>

                                    <p   className='text-muted mb-0'>
                                    {new Date(item.depart_date).toDateString()}  <i class="fa fa-arrow-right" aria-hidden="true"></i> {new Date(item.arrival_date).toDateString()}
                                </p>
                                </td>

<td>
    {item.weight} kg
</td>

                                <td>
                                    <p className='fw-normal mb-2'>  {item.price} €</p>

                                   
                                </td>

                            

                            {/* <td>
                                {(!item.available && date < new Date(new Date(item.depart_date).setDate(new Date(item.depart_date).getDate() - 1))) ? (
                                    <button href={"/my-reservations/annuler:" + item.id} className="button-reserve" onClick={() => annuler(item.id)}>
                                        Annuler
                                    </button>
                                ) : (
                                    <div></div>
                                )}
                            </td>
                            <td>
                                {!item.available ? (
                                    <div href={"/my-trajets/delete:" + item.id} className="button-reserve" onClick={() => delete_r(item.id)}>
                                        Supprimer
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </td> */}
<td>
    {(date < new Date(new Date(item.depart_date))) ? (
         <div>
         <MDBBadge color='success' pill>
          OUI ✅
      </MDBBadge>
      </div>
    ):(
        <div>
        <MDBBadge color='warning' pill>
         NON ❌
     </MDBBadge>
     </div>
    )}
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

function Child_1({ data, setChild }) {
    const date = new Date()


    const confirmer = (id) => {
        id ?
            TrajetService.confirmLivraison(id).then(response => {
                console.log(response)
                data = data.filter((d) => d.id != id)
                setChild(data)
            }).catch(err => console.log(err)) :
            console.log(id)
    }
    return (
        <>
            <div className="Result">
              

                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Nom</th>
                            <th scope='col'>Trajet</th>
                            <th scope='col'>Prix</th>
                            <th>Statut</th>

                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {data.map(item => (
                            <tr key={item.id}>

                                <td>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src='https://tse3.mm.bing.net/th?id=OIP.dLfpF42QdcvxBbTGL0ylYgHaHa&pid=Api&P=0'
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{item._id_em[0].name}</p>
                                            <p className='text-muted mb-0'>{item._id_em[0].email}</p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <p className='fw-normal mb-2'>{item._id_trajet[0].depart_city} <i class="fa fa-arrow-right" aria-hidden="true"></i> {item._id_trajet[0].dest_city}</p>

                                    <p   className='text-muted mb-0'>
                                    {new Date(item._id_trajet[0].depart_date).toDateString()}  <i class="fa fa-arrow-right" aria-hidden="true"></i> {new Date(item._id_trajet[0].arrival_date).toDateString()}
                                </p>
                                </td>



                                <td>
                                    <p className='fw-normal mb-2'> 1 kg <i class="fa fa-arrow-right" aria-hidden="true"></i> {item.price} €</p>

                                    <p   className='text-muted mb-0'>
                                    {item.weight } kg  <i class="fa fa-arrow-right" aria-hidden="true"></i> {item.total_price} €
                                </p>
                                </td>

                                

                                <td>
                            {/* && date > new Date(item._id_trajet[0].arrival_date) */}
                                {(!item.shipped) ? (
                                    // <button href={"/my-trajets/confirmer:" + item._id} className="button-reserve" onClick={() => confirmer(item._id)}>
                                    //     Confirmer la Livraison
                                    // </button>
                                    <div><MDBBadge color='warning' pill>
                                    En cours ...
                                </MDBBadge></div>
                                ) : (
                                    <div>
                                       <MDBBadge color='success' pill>
                                        Livré ✅
                                    </MDBBadge>
                                    </div>
                                )}
                            </td>

                            <td>
                            {/* && date > new Date(item._id_trajet[0].arrival_date) */}
                                {(!item.shipped && date > new Date(item._id_trajet[0].arrival_date) ) ? (
                                    <button href={"/my-trajets/confirmer:" + item._id} className="button-reserve" onClick={() => confirmer(item._id)}>
                                        Confirmer la Livraison
                                    </button>
                                ) : (
                                    <div>
                                    </div>
                                )}
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

    const [colis, setColis] = useState(undefined);
    const [colis_shipped, setColis_shipped] = useState(undefined);
    const [message_1, setMessage_1] = useState(undefined);

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

            TrajetService.getMyTrajetsReserved(currentUser.id).then(
                (response) => {
                    if (response.data.data) {
                        setColis(response.data.data)
                    } else {
                        setMessage_1(response.data.message)
                    }

                }
            ).catch(e => {
                console.log(e)
            }
            )
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

<h1> Les colis </h1>
                    <div>
                        {message_1 ? (
                            <div>
<h2>{message_1}</h2>
                            </div>
                        ) : (
                            <div>
<Child_1 data={colis} setChild={setColis} />
                            </div>
                        )}
                        
                    </div>

                    <h1> Mes trajets </h1>
                    <Child data={trajets_available} setChild={setTrajets_available} />

                    

                    {/* <h1> Mes trajets indisponnible </h1>
                    <Child_S data={trajets} setChild={setTrajets} /> */}


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
