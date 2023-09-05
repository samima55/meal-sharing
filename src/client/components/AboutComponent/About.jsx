import React from 'react';
import { Link } from 'react-router-dom';
import "./About.css";
import Footer from '../FooterComponent/Footer';

const About = () => {
  return (
    <>
     
      <div className="container about-container">
        <h1 className="mt-5 about-title">Wlcm to MealSharing App</h1>
        <p>
          This is a meal sharing app where people can come together to share and enjoy delicious meals. Whether you're a seasoned chef or simply enjoy trying new dishes, Meal Sharing App provides a platform to connect with fellow food enthusiasts and discover culinary delights from around the world.
        </p>
        
        <Link to="/" className="btn btn-custom mt-3">
          Back to Home
        </Link>
      </div>

      <Footer />
      </>
  );
};

export default About;
