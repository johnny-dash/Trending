import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from 'react-router-dom'
import { Routes } from './components/routes';

ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById("root")
);
