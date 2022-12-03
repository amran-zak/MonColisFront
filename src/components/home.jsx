// src/components/Home/Home.js

// import CSS
import '../css/Home.css';
import React from 'react';
const Home = (props) => {

    return (
        <div>
            <div className="banner-container">
                <div className="text-center">
                    <h1 className=" text-6xl text-orange-600 font-bold">Welcome to MonColis</h1>
                    <h4 className="text-4xl mt-8 text-white">Your very own Shipping Application</h4>
                </div>
            </div>
        </div>
    );
};

export default Home;