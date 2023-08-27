/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import PropTypes from "prop-types";
import "./testComponentStyle.css";

export default function TestComponent() {
  return (
    <section className="test-component">
      <p className="bg-blue-500 text-white p-4">in a component</p>
    </section>
  );
}
