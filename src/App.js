import './App.css';
import { Routes, Route } from "react-router-dom";

import Accueil from './components/accueil.component'
import Result from './components/result.component'
import SignUp from './components/signUp.component';
import Login from './components/login.component';
import AddTrajets from './components/addTrajet.component';
import ReserveTrajet from './components/reserveTrajet.component'
import MyReservations from './components/myReservations.component';
import MyTrajets from './components/myTrajets.component'

import PageNoFound from './pageNoFound.jsx'

function App() {
 
  return (
    <div className="App">
      <h1>Notre header</h1>
      
        
           <Routes>
            <Route  path="/" element={<Accueil/>} />
            <Route  path="/sign-up" element={<SignUp/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/add-trajet" element={<AddTrajets/>} />
            {/* <Route  path="/reserve-trajet" element={<ReserveTrajet/>} /> */}
            <Route  path="/my-reservations" element={<MyReservations/>} />
            {/* <Route  path="/my-trajets" element={<MyTrajets/>} /> */}
            {/* <Route  path="/search-result" element={<Result/>} /> */}

            <Route  path="/*" element={<PageNoFound/>} />
          </Routes>

          <h1>Notre footer</h1>
    </div>
  );
}

export default App;
