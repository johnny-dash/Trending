import React, { Component } from "react";
import ReactDOM from "react-dom";
import './dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className='center'>Financial Sentiment Analysis</h1>
                <br />
                <div className='center'>
                    <span className='very-big' >A platform to make money </span><span className='very-small'>someday.</span>
                </div>
                <div className='center'>
                    <img src="https://media.giphy.com/media/VTxmwaCEwSlZm/200.gif"></img>
                </div>
            </div>

        )
    }

}

export default Dashboard;