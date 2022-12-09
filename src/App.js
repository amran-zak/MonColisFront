import './App.css';
import { Routes, Route } from "react-router-dom";

import Header from './components/header';
import Footer2 from './components/footer';
import Home from './components/home';

import Accueil from './components/accueil.component'
import Result from './components/result.component'
import SignUp from './components/signUp.component';
import Login from './components/login.component';
import AddTrajets from './components/addTrajet.component';
import ReserveTrajet from './components/reserveTrajet.component'
import MyReservations from './components/myReservations.component';
import MyTrajets from './components/myTrajets.component'

import Contact from './components/contact.component';
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form';

import AdminBoard from './components/adminBoard'

import AuthService from './services/auth.service';

import PageNoFound from './pageNoFound.jsx'



function App() {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="App">
      <Header/>
        {
          currentUser ? (
            <h1>
              Welcome {currentUser.name}
            </h1>
          ):(
            <h1>
          </h1>
          )
        }
       
           <Routes>
            <Route  path="/" element={<Accueil/>} />
            <Route  path="/sign-up" element={<SignUp/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/add-trajet" element={<AddTrajets/>} />
            {/* <Route  path="/reserve-trajet" element={<ReserveTrajet/>} /> */}
            <Route  path="/my-reservations" element={<MyReservations/>} />
            <Route  path="/my-trajets" element={<MyTrajets/>} />
            {/* <Route  path="/search-result" element={<Result/>} /> */}

            <Route  path="/admin" element={<AdminBoard/>} />

            <Route  path="/contact-us" element={<HubspotProvider><Contact/></HubspotProvider>} />

            <Route  path="/*" element={<PageNoFound/>} />

          </Routes>

          <Footer2/>
    </div>
  );
}

export default App;
