import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import Chart from 'chart.js';
import './news.css';
class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
          news: [],
          pieChartFinance: {},
          pieChartEconomic: {},
          pieChartBusiness: {},
          newsNumber: 0
        };
    }


    componentDidMount() {
        const _this = this;
        fetch('http://localhost:3001/newsSentiment')
        .then(res => {
            res.json().then(value => {

                let financePieChartCanvas = _this.refs.financePieChart;
                let businessPieChartCanvas = _this.refs.businessPieChart;
                let marketPieChartCanvas = _this.refs.marketPieChart;

                let financePieChart = new Chart(financePieChartCanvas, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: value.finance,
                            backgroundColor: ['rgba(123, 196, 78,1)', 'rgba(0, 162, 231, 1)', 'rgba(255, 63, 105, 1)']
                        }],
                        labels: ["Positive", "Natural", "Negative"]
                    }
                  });

                let businessPieChart = new Chart(businessPieChartCanvas, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: value.business,
                            backgroundColor: ['rgba(123, 196, 78,1)', 'rgba(0, 162, 231, 1)', 'rgba(255, 63, 105, 1)']
                        }],
                        labels: ["Positive", "Natural", "Negative"]
                    }
                });

                let marketPieChart = new Chart(marketPieChartCanvas, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: value.market,
                            backgroundColor: ['rgba(123, 196, 78,1)', 'rgba(0, 162, 231, 1)', 'rgba(255, 63, 105, 1)']
                        }],
                        labels: ["Positive", "Natural", "Negative"]
                    }
                });
                _this.setState({pieChartBusiness: businessPieChart});
                _this.setState({pieChartEconomic: marketPieChart});
                _this.setState({pieChartFinance: financePieChart});
            })
        })
        .catch(err => {
            console.log(err);
        });

        fetch('http://localhost:3001/news')
        .then(res => {
            res.json().then(resNews => {
                console.log(resNews.financeNews);
                _this.setState({
                    news: resNews.financeNews
                })
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleSelect(evt) {
        console.log(evtKey);
    }

    render() {
        const now = new Date().toDateString();
        return (
            <div className="container">
                <h3>News sentiment by {now}</h3>
                <div className='row gutter'>
                    <div className='card col-4'>
                        <div className='card-title'>
                            <h5>Finance</h5>
                        </div>
                        <div className='card-body'>
                            <canvas ref={'financePieChart'}></canvas>
                        </div>
                    </div>
                    <div className='card col-4'>
                        <div className='card-title'>
                            <h5>Market</h5>
                        </div>
                        <div className='card-body'>
                            <canvas ref={'marketPieChart'}></canvas>
                        </div>
                    </div>
                    <div className='card col-4'>
                        <div className='card-title'>
                            <h5>Business</h5>
                        </div>
                        <div className='card-body'>
                            <canvas ref={'businessPieChart'}></canvas>
                        </div>
                    </div>
                </div>
                <h2>News log</h2>
                <ButtonToolbar>
                <DropdownButton
                    bsStyle='primary'
                    title='Select a Key word'
                    id="source-dropdown"
                    onSelect={function(evt) {
                        console.log(evt);
                    }}
                    >
                        <MenuItem eventKey="financeNews" active>Finance</MenuItem>
                        <MenuItem eventKey="marketNews">Market</MenuItem>
                        <MenuItem eventKey="businessNews">Business</MenuItem>
                </DropdownButton>
                </ButtonToolbar>
                <div className='row'>
                    <ul className='list-group list'>
                    {this.state.news.map((item, index) => {
                            return <li className="list-group-item" key={index}>
                                <div className='row'>
                                    <div className='col-1'>
                                        <span>{item.source}</span>
                                    </div>
                                    <div className='col-8'>
                                        <span>{item.description}</span>
                                    </div>
                                    <div className='col-1'>
                                        <span>{item.publishedAt.split('T')[0]}</span>
                                    </div>
                                    <div className={"col-1 " + (item.sentiment > 0 ? "positive" : (item.sentiment == 0 ? "natural" : "negative")) }>
                                        <span>{item.sentiment}</span>
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

export default News;