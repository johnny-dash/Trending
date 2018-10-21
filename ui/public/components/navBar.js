import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Financial Sentiment Analysis</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">DashBoard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/news">News</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/twitter">Twitter Stream</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled-link" to="/dis">Stock Market Stream</Link>
                    </li>
                    </ul>

                </div>

            </nav>
        )
    }
}

export default NavBar;