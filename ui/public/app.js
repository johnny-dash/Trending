import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/form";
import apiCall from "./services/apiCall";

ReactDOM.render(
  <Form {...apiCall} />,
  document.getElementById("fromComponent")
);
