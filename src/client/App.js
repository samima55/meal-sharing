import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/MealListComponent/MealsList";
import "./App.css"; // Import the global CSS file
function App() {
  return (
    <Router>
      <Route exact path="/">
        <p className="header"> Meals </p>
        <MealsList/>
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
