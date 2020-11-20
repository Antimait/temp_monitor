import React, { Component } from "react";
import ReactDOM from "react-dom";
import GraphBox from "./GraphBox";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import "./index.css";

let url = new URL(window.location.origin);

url.port = 1880
const nodeEndpoint = url.origin;

url.protocol = "ws:";
const wsEndpoint = url.origin;

const client = new W3CWebSocket(wsEndpoint);

class App extends Component {
    temp_data;
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: [],
            error: false
        }
    }

     componentDidMount(){
        fetch(nodeEndpoint + "/temp_data")
        .then(resp => resp.json())
        .then(arr => {
            this.setState({
                labels: [...Array(arr.length).keys()],
                data: arr.map(x => parseInt(x)),
                error: false
            });
        })

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            console.log(message);
            const newTemp = parseInt(message.data);
            let labels = this.state.labels;
            let temp_data = this.state.data;
            labels.push(labels[labels.length - 1] + 1);
            temp_data.push(newTemp);
            this.setState({
                labels: labels,
                data: temp_data
            });
        };
    }

    render() {
        const {labels, data, error} = this.state;
        console.log(labels, data);
        if (error) {
            return <div><p>Error!</p></div>;
        }

        return(<GraphBox labels={labels} data={data} />);
    }
}

ReactDOM.render(<App />, document.getElementById("root"),)