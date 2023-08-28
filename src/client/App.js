import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css"; // Import the global CSS file
import "./index.css";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/MealListComponent/MealsList";
import MealDetail from "./components/MealComponent/MealDetail";
import MealReservations from "./components/ReservationComponent/MealReservations";
import FrontPage from "./components/FrontPageComponent/FrontPage.jsx";
import About from "./components/AboutComponent/About"; 
import MealReview from "./components/ReviewComponent/MealReview";



function App() {
  
  return (
    <Router>
      
         <Route exact path="/">
        <FrontPage />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

      <Route exact path="/meals" render={(props) => (
       <div>
    <h2 className="meal-title py-3 text-center">Meals</h2>
    <MealsList match={props.match} />
        </div>
)} />



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
