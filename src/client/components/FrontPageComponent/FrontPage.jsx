import React from "react";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div>
      <p>front page</p>
      <Link to="/meals">Go to Meals List</Link>
     
    </div>
  );
};

export default FrontPage;
