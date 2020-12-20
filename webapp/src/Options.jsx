import React, { Component } from "react";
import Chart from "chart.js"

import "./index.css";

export default class Options extends Component {
	render(){
		return(
			<div className="options">
				<button onClick={() => this.props.resetHandler()}>Reset</button>
			</div>
		);
	}
}		