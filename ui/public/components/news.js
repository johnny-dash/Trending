import React, { Component } from "react";
import ReactDOM from "react-dom";
import { subscribeToNews, closeSocket } from "../services/socketIO";
import Chart from 'chart.js';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
          news: [],
          lineChart: {},
          newsNumber: 0
        };

        subscribeToNews((data) => {
            this.state.newsNumber ++;
            // update status
            const news = this.state.news;
            news.push(data);
            this.setState({
                news
            })

            this.state.lineChart.data.labels.push(data.time);
            this.state.lineChart.data.datasets[0].data.push(data.value);

            if (this.state.newsNumber > 5) {
                this.state.lineChart.data.labels.shift();
                this.state.lineChart.data.datasets[0].data.shift();
            }

            this.state.lineChart.update();
        });
    }


    renderNewsList() {
        const news = [];
        this.state.news.forEach(item => {
            // console.log(item);
            news.push(<li class="list-group-item"> 123 </li>);
        })
        return news;
    }

    componentDidMount() {
        let lineChartCanvas = this.refs.lineChart;
        const lineData = {
            labels: [],
            datasets: [
                {
                    label: "Overall Sentiment",
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0,255,0,0.5)',
                    data: []
                },
                {
                    label: "Finance",
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(255,0,0,0.5)',
                    data: []
                },
                {
                    label: "Economic",
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(255,255,0,0.5)',
                    data: []
                }
            ]
        };

        let myLineChart = new Chart(lineChartCanvas, {
          type: 'line',
          data: lineData
        });

        this.setState({lineChart: myLineChart});

        const pieData = {
            datasets: [{
                data: [10,20,30]
            }],
            labels: ["January", "February", "March"]
        }

        let pieChartCanvas = this.refs.pieChart;
        let myPieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: pieData,
            options: {
                segmentShowStroke : true,
                segmentStrokeColor : "#fff",
            }
          });
        this.setState({pieChart: myPieChart});
    }

    componentWillUnmount() {
        closeSocket();
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-10'>
                        <canvas ref={'lineChart'} height={'50'} width={'200'}></canvas>
                    </div>
                    <div className='col-2'>
                        <canvas ref={'pieChart'} height={'30'} width={'30'}></canvas>
                    </div>
                </div>
                <h2>News log</h2>
                <div className='row'>
                    <ul className='list-group list'>
                        { this.renderNewsList() }
                    </ul>
                </div>
            </div>

        )
    }

}

export default News;