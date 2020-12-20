import React, { Component } from "react";
import ReactDOM from "react-dom";
import GraphBox from "./GraphBox";
import Options from "./Options";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import "./index.css";

let url = new URL(window.location.origin);

url.port = 1880
const nodeEndpoint = url.origin;

url.protocol = "ws:";
const wsEndpoint = url.origin;

const client = new W3CWebSocket(wsEndpoint);
client.onopen = () => {
    console.log('WebSocket Client Connected');
};



class App extends Component {
    temp_data;
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: [],
            error: false
        }
        this.resetHandler = this.resetHandler.bind(this);

        client.onmessage = (message) => {
            const newTemp = parseInt(message.data);
            let labels = this.state.labels;
            let temp_data = this.state.data;
            if(labels.length === 0) {
                labels = [0];
            } else {
                labels.push(labels[labels.length - 1] + 1);                
            }
            temp_data.push(newTemp);
            this.setState({
                labels: labels,
                data: temp_data
            });
        };
    }

    async componentDidMount(){
        const resp = await fetch(nodeEndpoint + "/temp_data");
        const arr = await resp.json();

        console.log(arr);
        this.setState({
            labels: [...Array(arr.length).keys()],
            data: arr.map(x => parseInt(x)),
            error: false
        });
    }

    async resetHandler() {
        const delResp = await fetch(nodeEndpoint + "/temp_data", {method: "delete"});
        this.setState({
            labels: [],
            data: [],
            error: false
        });
    }

    render() {
        const {labels, data, error} = this.state;
        console.log(labels, data);
        if (error) {
            return <div><p>Error!</p></div>;
        }

        return(
            <div id="mainBox">
                <GraphBox labels={labels} data={data} />
                <Options resetHandler={this.resetHandler} />
            </div>
        ); 
    }
}

ReactDOM.render(<App />, document.getElementById("root"),)