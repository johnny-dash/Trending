import React, { Component } from "react";
import ReactDOM from "react-dom";
import { subscribeToTwitter, closeSocket } from  '../services/socketIO';
import './twitter.css';

class Twitter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            tweetNumber: 0,
            lineChart: {},
        };

    }

    componentDidMount() {
        let ref = this;
        subscribeToTwitter((data) => {
            // update status
            const tweetNumber = ref.state.tweetNumber + 1;
            const tweets = ref.state.tweets;
            tweets.unshift(data);
            ref.setState({
                tweets,
                tweetNumber
            })

            ref.state.lineChart.data.labels.push(data.created_at.split(' ')[3]);
            ref.state.lineChart.data.datasets[0].data.push(data.sentiment);

            if (tweetNumber > 20) {
                ref.state.lineChart.data.labels.shift();
                ref.state.lineChart.data.datasets[0].data.shift();
            }

            ref.state.lineChart.update();
        });

        let lineChartCanvas = this.refs.lineChart;
        const lineData = {
            labels: [],
            datasets: [
                {
                    label: "Overall Sentiment",
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0,0,0,0.5)',
                    data: []
                }
            ]
        };

        let myLineChart = new Chart(lineChartCanvas, {
          type: 'line',
          data: lineData
        });

        this.setState({lineChart: myLineChart});
    }


    componentWillUnmount() {
        closeSocket()
    }

    render() {
        return (
            <div>
                <h2>Twitter Stream</h2>
                <hr />
                <h3>Sentiment chart</h3>
                <h5>The following time series line chart displays the real-time sentiment change of keyword 'Finance', 'Market', 'Business' from Twitter.</h5>
                <div className='row'>
                    <div className='col-12'>
                            <canvas ref={'lineChart'} height={'50'} width={'200'}></canvas>
                    </div>
                </div>
                <hr />
                <h3>Stream log</h3>
                <h5>Check the tweet details here and corresponding sentiment index.</h5>
                <div className="row">
                    <ul className="col-12 list-group twitter-list">
                        {this.state.tweets.map((tweet, index) => {
                            return <li className="list-group-item" key={index}>
                                <div className='row'>
                                    <div className='col-1'>
                                        <img src={tweet.user.profile_image}></img>
                                    </div>
                                    <div className='col-1'>
                                        {tweet.user.name}:
                                    </div>
                                    <div className='col-8'>
                                        {tweet.text}
                                    </div>
                                    <div className='col-1'>
                                        {tweet.created_at.split(' ')[3]}
                                    </div>
                                    <div className={"col-1 " + (tweet.sentiment > 0 ? "positive" : (tweet.sentiment == 0 ? "natural" : "negative")) }>
                                        {tweet.sentiment}:
                                    </div>
                                </div>

                            </li>;
                        })}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Twitter;