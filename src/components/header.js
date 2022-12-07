// src/components/Header.js


import React, { useEffect, useState }from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../services/auth.service';

const Header = () => {

    const [currentUser, setCurrentUser] = useState(undefined); 

	useEffect(() => {
	const user = AuthService.getCurrentUser();
	if (user) {
      setCurrentUser(user);
	}
	}, []);

	const logOut = () => {
		AuthService.logout();
		setCurrentUser(undefined);
	};

    return (
        <div className="navbar bg-[#000000] text-white  px-16">
            <div className="flex-1">
                <a href="/" className="btn btn-light normal-case text-3xl"><i className="fas fa-box-open"></i>   MonColis</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 font-bold">
                    <li><a href='/'><i className="fas fa-home"></i>Home</a></li>

                    <li><a href='/add-trajet'> 	<i className="fas fa-bus"></i>Ajouter un trajet</a></li>


                    {currentUser ? (
                        <li>
                           
                            <a href='/my-reservations'> <i className='fas fa-user'></i>Mes reservations</a>
                            <a href='/my-trajets'> <i className='fas fa-user'></i>Mes trajets</a>
                            <a href='/login'  onClick={logOut}> <i className='fas fa-user'></i>Logout</a>
                        </li>
                    ) : (
                        <li><a href='/sign-up'> <i className='fas fa-user'></i>Sign-up</a>
                        <a href='/login'> <i className='fas fa-user'></i>Login</a></li>
                    )}
                    <li><a>  <i className="fas fa-phone"></i>Contact Us</a></li>

                </ul>
            </div>
        </div>
    );
};

export default Header;