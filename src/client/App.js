import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css"; // Import the global CSS file
import "./index.css";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/MealListComponent/MealsList";
import MealDetail from "./components/MealComponent/MealDetail";
import MealReservations from "./components/ReservationComponent/MealReservations";
import FrontPage from "./components/FrontPageComponent/FrontPage.jsx";

import MealReview from "./components/ReviewComponent/MealReview";
function App() {
  
  return (
    <Router>
      
         <Route exact path="/">
          <p className="bg-blue-500 text-white p-4"> hello</p>
          <h1 className="bg-blue-500 text-white p-4">
      Hello world!
    </h1>
          <FrontPage />
        </Route>
     
      <Route exact path="/meals">
        <p className="header"> Meals </p>
        <MealsList/>
      </Route>
     
      <Route exact path="/meals/:id">
        <MealDetail/>
      </Route>
     
      <Route path="/meals/:id/reservations">
        <MealReservations/>
      </Route>
     
      <Route path="/meals/:id/reviews">
        <MealReview/>
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
   
    </Router>
  );
}

export default App;
