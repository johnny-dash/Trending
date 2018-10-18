import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import Chart from 'chart.js';
import './news.css';
class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
          news: {},
          pieChartFinance: {},
          pieChartEconomic: {},
          pieChartBusiness: {},
          newsNumber: 0,
          currentNews: [],
          currentNewsKey: 'financeNews'
        };

        this.selectOnChange = this.selectOnChange.bind(this);
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
                const currentNewsKey = _this.state.currentNewsKey;
                _this.setState({
                    news: resNews,
                    currentNews: resNews[currentNewsKey]
                })
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    selectOnChange(event) {
        const news = this.state.news;
        const value = event.target.value;

        this.setState({
            currentNews: news[value],
            currentNewsKey: value
        })
    }

    render() {
        const now = new Date().toDateString();
        return (
            <div className="container">
                <h3>News sentiment by {now}</h3>
                <h5>The following charts are the sentiment proportion of three key work 'finance', 'market', 'business' from the news source.</h5>
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
                <h3>News log</h3>
                <h5>Select the news source to check the detail information and corresponding sentiment index</h5>
                <select onChange={this.selectOnChange} value={this.state.currentNewsKey}>
                    <option value='financeNews'>Finance</option>
                    <option value='marketNews'>Market</option>
                    <option value='businessNews'>Business</option>
                </select>
                <div className='row'>
                    <ul className='list-group list'>
                    {this.state.currentNews.map((item, index) => {
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