import React, { Component } from "react";
import Chart from "chart.js"

import "./index.css";

export default class GraphBox extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        let ctx = document.getElementById('mainChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',

            data: {
                labels: this.props.labels,
                datasets: [{
                    label: 'Temperatura',
                    background: null,
                    borderColor: 'rgb(255, 99, 132)',
                    data: this.props.data,
                }]
            },
            options: {}
        });
    }

    render() {
        return(
            <div className="mainGraph">
                <canvas id="mainChart"/>
            </div>
        );
    }

}